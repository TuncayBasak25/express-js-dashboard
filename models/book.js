'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static CATEGORIES = ['', 'roman', 'dictionnaire', 'science', 'whatever'];

    static associate(models) {
      // define association here
      Book.belongsTo(models.User, {
        as: 'Borrower'
      });

      Book.belongsTo(models.User, {
        as: 'Reserver'
      });
    }
  };
  Book.init({
    title: DataTypes.STRING,
    reference: DataTypes.STRING,
    category: DataTypes.STRING,
    writtingDate: DataTypes.DATEONLY,
    editionDate: DataTypes.DATEONLY,
    reservationDate: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
