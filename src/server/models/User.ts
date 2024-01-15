import { getDB } from '../Database'
import { DataTypes, Model } from "sequelize";

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 50
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 50
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 6,
            max: 50
        },
        // get() {

        // },
        // set() {

        // }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 4,
            max: 100
        }
    },
    status: {
        type: DataTypes.ENUM("active", "deactive", "pending", "trash"),
        defaultValue: "active"
    },

    tanant_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    access_type: {
        type: DataTypes.ENUM("public", "private"),
        defaultValue: "private",
        allowNull: false
    },
    branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: getDB(),
    modelName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})

User.sync({ force: true })
export default User