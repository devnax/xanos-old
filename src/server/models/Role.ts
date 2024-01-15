import { getDB } from '../Database'
import { DataTypes, Model } from "sequelize";

class UserRole extends Model { }

UserRole.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 50
        }
    },
    status: {
        type: DataTypes.ENUM("active", "deactive"),
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
    modelName: 'user_roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})

export default UserRole