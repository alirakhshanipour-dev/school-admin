import { Sequelize } from "sequelize";
import { initStudent } from "../../models/student.model.js";



const sequelize = new Sequelize({
    username: "alirakhshanipur",
    password: "",
    database: "schoolManagement",
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    logging: false
})

const models = {
    Student: initStudent(sequelize),
}


function associateModels(models) {
    Object.values(models).forEach(model => {
        if (model.associate) {
            model.associate(models)
        }
    })
}

function syncModels(models) {
    Object.values(models).forEach(model => {
        model.sync({ alter: true })
    })
}

syncModels(models)
associateModels(models)

const sequelizeConfig = (sequelize) => {
    sequelize.sync({ alter: true })
        .then(() => {
            console.log("database synced successfully");
        })
        .catch((err) => {
            console.log("error in syncronizing database:", err);
        })

}


export { sequelize, models, sequelizeConfig }