import createHttpError from "http-errors";
import { DataTypes, Model } from "sequelize";

class Teacher extends Model {
    static associate(models) { }

    static async findTeacher(id) {
        const teacher = await this.findByPk(id)
        return teacher ? teacher : (() => {
            throw new createHttpError.NotFound("مدرسی با این مشخصات یافت نشد")
        })()
    }

    // find teachers with filtering data
    static async findTeachersWithFilter(filters) {
        const { page = 1, limit = 10, ...filterParams } = filters;
        const offset = (page - 1) * limit;

        const where = {};
        for (const [key, value] of Object.entries(filterParams)) {
            if (value) {
                where[key] = { [Op.like]: `%${value}%` };
            }
        }

        const { count, rows } = await this.findAndCountAll({
            where,
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        return {
            totalRecords: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            students: rows
        };
    }
}

function initTeacher(sequelize) {
    return Teacher.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "نام نمیتواند خالی بماند"
                },
                notEmpty: {
                    msg: "نام نمیتواند خالی بماند"
                }
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "نام خانوادگی نمیتواند خالی بماند"
                },
                notEmpty: {
                    msg: "نام خانوادگی نمیتواند خالی بماند"
                }
            }
        },
        father_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "نام پدر نمیتواند خالی بماند"
                }
            }
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
            validate: {
                is: {
                    args: /^[0-9]{10,15}$/,
                    msg: "فرمت شماره تلفن غیرقابل قبول است"
                }
            }
        },
        national_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "کد ملی نمیتواند خالی بماند"
                },
                notNull: {
                    msg: "کد ملی نمیتواند خالی بماند"
                }
            }
        },
        personal_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "کد پرسنلی نمیتواند خالی بماند"
                },
                notNull: {
                    msg: "کد پرسنلی نمیتواند خالی بماند"
                }
            }
        },

        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        birth_province: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "استان محل تولد نمیتواند خالی بماند"
                },
                notNull: {
                    msg: "استان محل تولد نمیتواند خالی بماند"
                }
            }
        },
        birth_city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "شهر محل تولد نمیتواند خالی بماند"
                },
                notNull: {
                    msg: "شهر محل تولد نمیتواند خالی بماند"
                }
            }
        },
        religion: {
            type: DataTypes.ENUM,
            values: ['اسلام', 'مسیحیت', 'یهودیت', 'هندوئیسم', 'بودیسم', 'سایر'],
            allowNull: false,
            validate: {
                notNull: {
                    msg: "لطفا مذهب را انتخاب کنید"
                },
                isIn: {
                    args: [['اسلام', 'مسیحیت', 'یهودیت', 'هندوئیسم', 'بودیسم', 'سایر']],
                    msg: "لطفا یک مذهب درست راانتخاب کنید"
                }
            }
        },
        field: {
            type: DataTypes.ENUM,
            values: ['برق', 'مکانیک', 'چوب'],
            defaultValue: 'برق',
            validate: {
                isIn: {
                    args: [['برق', 'مکانیک', 'چوب']],
                    msg: "رشته باید یکی از موارد بالا باشد"
                }
            }
        },
        license_grade: {
            type: DataTypes.ENUM,
            values: ['کاردانی', 'کارشناسی', 'کارشناسی ارشد', 'دکتری'],
            defaultValue: 'کارشناسی',
            validate: {
                isIn: {
                    args: [['کاردانی', 'کارشناسی', 'کارشناسی ارشد', 'دکتری']],
                    msg: "مدرک تحصیلی باید یکی از موارد بالا باشد"
                }
            }
        },

    }, {
        sequelize,
        modelName: "Teacher",
        tableName: "teachers",
    });
}


export { Teacher, initTeacher }