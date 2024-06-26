const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Transaction extends Model {}

Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.ENUM('income', 'expense'),
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }

    }
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'transaction',
      }
    );
    
    module.exports = Transaction;
    
