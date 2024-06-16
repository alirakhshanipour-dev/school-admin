import createHttpError from "http-errors";
import { DataTypes, Model } from "sequelize";

class Student extends Model {
    static associate(models) {

    }


    static async findStudent(id) {
        const student = await Student.findOne({ where: { id } })
        if (!student) {
            throw new createHttpError.NotFound("دانش‌آموزی با این مشخصات پیدا نشد")
        }
        return student
    }
}

function initStudent(sequelize) {
    return Student.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
            validate: {
                notEmpty: {
                    msg: "کد ملی نمیتواند خالی بماند"
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
                }
            }
        },
        birth_city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
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
        is_international: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        physical_condition: {
            type: DataTypes.ENUM,
            values: ['سالم', 'دارای معلولیت'],
            allowNull: false,
            validate: {
                notNull: {
                    msg: "شرایط جسمانی نمیتواند خالی بماند"
                },
                isIn: {
                    args: [['سالم', 'دارای معلولیت']],
                    msg: "شرایط جسمانی را به درستی انتخاب کنید"
                }
            }
        },
        left_handed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        acception_status: {
            type: DataTypes.ENUM,
            values: ['accepted', 'rejected', 'pending'],
            defaultValue: 'pending',
            validate: {
                isIn: {
                    args: [['accepted', 'rejected', 'pending']],
                    msg: "وضعیت پذیرش باید یکی از موارد بالا باشد"
                }
            }
        },
        accepted_field: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        accept_all_rules: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: "Student",
        tableName: "students",
    });
}

export { initStudent, Student }