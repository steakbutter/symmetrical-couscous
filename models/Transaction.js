const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Transaction extends Model {}

Transaction.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: Datatypes.ENUM('income', 'expense'),
            allowNull: false
        },
        amount: {
            type: Datatypes.DECIMAL,
            allowNull: false
        },
        description: {
            type: Datatypes.STRING,
        },
        category: {
            type: Datatypes.DATE,
            allowNull: false
        },
        date: {
            type: Datatypes.DATE,
            allowNull: false
        }

    }
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'project',
      }
    );
    
    module.exports = Transaction;
    
