const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

class User extends Model {
  correctPassword(login) {
      return bcrypt.compareSync(login, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER
      , primaryKey: true
      , autoIncrement: true
      , allowNull: false
    }
      , username: {
      type: DataTypes.STRING
      , allowNull: false
    }
      , password: {
      type: DataTypes.STRING
      , allowNull: false
      , validate: {
        len: [4]
      }
    }
  }
  , {
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
          return user;
        }
        , beforeUpdate: async (refreshUser) => {
          refreshUser.password = await bcrypt.hash(refreshUser.password, 10);
          return refreshUser;
        }
    }
    , sequelize
    , timestamps: false
    , freezeTableName: true
    , underscored: true
    , modelName: 'User'
  }
);

module.exports = User;