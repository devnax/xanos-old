import { Sequelize } from 'sequelize'

const DB = new Sequelize('xanos', 'root', '12345678', {
    host: 'localhost',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false,
})

export default DB