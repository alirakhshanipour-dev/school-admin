import { DataTypes, Model } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import createHttpError from "http-errors";
config()

class User extends Model {
    static associate(models) {
        // Define associations here if any
    }

    static async findUser(id) {
        const user = await this.findByPk(id, {
            attributes: {
                exclude: ["id", "password", "createdAt", "updatedAt"]
            }
        })
        return user ? user : (() => {
            throw new createHttpError.NotFound("کاربری با این مشخصات یافت نشد")
        })()
    }


    // find Users with filtering data
    static async findUsersWithFilter(filters) {
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
                exclude: ["password", "createdAt", "updatedAt"]
            }
        });

        return {
            totalRecords: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            students: rows
        };
    }


    // Generate JWT
    generateJWT() {
        return jwt.sign(
            { id: this.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );
    }

    // Validate Password
    validatePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }

}
function initUser(sequelize) {
    return User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "نام کاربری نمیتواند خالی بماند"
                },
                notEmpty: {
                    msg: "نام کاربری نمیتواند خالی بماند"
                }
            }
        },
        phone: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "شماره تماس نمیتواند خالی بماند"
                },
                notEmpty: {
                    msg: "شماره تماس نمیتواند خالی بماند"
                },
                is: {
                    args: /^[0-9]{10,15}$/,
                    msg: "شماره تماس نامعتبر است"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: {
                    msg: "ایمیل نامعتبر است"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "رمز عبور نمیتواند خالی بماند"
                },
                notEmpty: {
                    msg: "رمز عبور نمیتواند خالی بماند"
                }
            }
        },
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'user', 'guest'],
            defaultValue: 'user',
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "User",
        tableName: "users",
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    });
}


export { User, initUser };
