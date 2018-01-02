'use strict'

module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('Bill', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING, 
      required: true,
      default: "Unknown"
    },
    title: {
      type: DataTypes.STRING,
      required: true
    },
    body: { 
      type: DataTypes.STRING, 
      required: true
    },
    date: {
      type: DataTypes.STRING,
      default: Date.now
    },
    partySponsor: {
      type: DataTypes.STRING
    },
    voteCount: {
      type: DataTypes.INTEGER
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  });

  Bill.associate = function(models) {

    Bill.belongsToMany(models.User, {
      through: 'UserBill'
    });

    Bill.hasMany(models.Post, {
      constraints: false
      //foreignKey: 'postId',
      //as: 'posts'
    });
  };

  return Bill;
};














