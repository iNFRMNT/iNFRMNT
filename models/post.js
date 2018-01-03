'use strict'

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    // These should be created by sequelize automatically from the relations in each model
    // UserId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   ref: 'User'
    // },
    // BillId: {
    //   type: DataTypes.UUID,
    //   //allowNull: false,
    //   ref: 'Bill'
    // },
    // createdBy: {
    //    userName
    // },
    title: {
      type: DataTypes.TEXT
    },
    body: {
      type: DataTypes.TEXT,
      required: true
    },
    //Time stamps.
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  });

  Post.associate = function(models) {

    Post.belongsTo(models.User, {
      constraints: false,
      // foreignKey: 'UserId',
      allowNull: false
    });

    Post.belongsTo(models.Bill, {
      constraints: false,
      //foreignKey: 'BillId',
      allowNull: false
      
    });
  };

  return Post;
};

