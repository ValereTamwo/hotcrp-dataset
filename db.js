// db.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Mot = sequelize.define('mot', {
  langue: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mots: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contexte_positif: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contexte_negatif: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = {
  sequelize,
  Mot
};
