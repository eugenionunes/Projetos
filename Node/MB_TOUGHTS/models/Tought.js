const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

// User

const Tought = db.define('Tought', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  }
}) //, { freezeTableName: true })

Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought