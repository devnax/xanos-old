import { getDB } from '../Database'
import { DataTypes, Model } from "sequelize";

class Branch extends Model { }

Branch.init({
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
        type: DataTypes.ENUM("1", "0"),
        defaultValue: "1",
        get() {
            const v = this.getDataValue('status');
            return v === "1" ? "active" : "deactive"
        },
    },

    tanant_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 1
        }
    }
}, {
    sequelize: getDB(),
    modelName: 'branches',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})


export default Branch