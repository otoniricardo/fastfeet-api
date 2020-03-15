import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          validate: { notEmpty: { msg: 'name can not be empty' } },
        },
        street: {
          type: Sequelize.STRING,
          validate: { notEmpty: { msg: 'street can not be empty' } },
        },
        number: {
          type: Sequelize.STRING,
          validate: { notEmpty: { msg: 'number can not be empty' } },
        },
        complement: {
          type: Sequelize.STRING,
          validate: { notEmpty: { msg: 'complement can not be empty' } },
        },
        city: {
          type: Sequelize.STRING,
          validate: { notEmpty: { msg: 'city can not be empty' } },
        },
        state: {
          type: Sequelize.STRING,
          validate: { notEmpty: { msg: 'state can not be empty' } },
        },
        cep: {
          type: Sequelize.STRING,
          validate: { notEmpty: { msg: 'cep can not be empty' } },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Recipient;
