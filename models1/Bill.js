'use strict'

module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('post', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    author: {
      type: String, 
      required: true,
      default: "Unknown author"
    },
    title: {
      type: String,
      required: true,
    },
    body: { 
      type: String, 
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    partySponsor: {
      type: String,
    },
    voteCount: {
      type: Number
    }
  });
};














