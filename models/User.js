'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      trim: true, 
      required: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      trim: true,
      required: true,
      // minlength: 6,
      // maxlength: 20
    },
    email: {
      type: DataTypes.STRING,
      required: true, 
      //validate: [validate.email, 'invalid email address']
    },
    zipcode: {
      type: DataTypes.STRING,
      required: true,
      //validate: [validate.postalCode, 'invalid zipcode']
    },
    //posts: [{}]
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  });
  User.associate = function(models) {

    User.hasMany(models.Topic, {
      constraints: false
      // foreignKey: 'TopicId'
      // as: 'topics'
    });

    User.belongsToMany(models.Bill, {
      through: 'UserBill'
    });

    User.hasMany(models.Post, {
      constraints: false
      //foreignKey: 'PostId'
    });
  };

  return User;
};