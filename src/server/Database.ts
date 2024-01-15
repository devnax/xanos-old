import { Sequelize } from 'sequelize'
import { getConfig, XANOSDBConfig } from '../config/server'

const DB_INSTANCES: { [id: string]: Sequelize } = {}

const createConnection = (id: string, config: XANOSDBConfig, schema?: string): Sequelize => {
    if (!DB_INSTANCES[id]) {
        const option: any = {
            host: config.host,
            port: config.port,
            dialect: "mysql",
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            logging: false
        }
        if (schema) {
            option.schema = schema
        }
        DB_INSTANCES[id] = new Sequelize(config.database, config.user, config.password, option)
    }

    return DB_INSTANCES[id]
}

export const getDB = () => {
    const { databases } = getConfig()
    return createConnection("main", databases.main)
}

export const _getDB = async (userId: number) => {
    const { databases } = getConfig()
    if (databases.tanants && Object.keys(databases.tanants).length) {
        for (let id in databases.tanants) {
            createConnection(id, databases.tanants[id])
        }
    } else {
        // return getMainDB()
    }

    // Read User tanant

}