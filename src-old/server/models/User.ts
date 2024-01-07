import DB from '../inc/DB'
import { DataTypes, Model } from "sequelize";

class User extends Model {
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
}, {
    sequelize: DB,
    modelName: 'User'
})

User.sync({ force: false })
export default User