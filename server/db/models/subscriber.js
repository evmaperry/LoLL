module.exports = (sequelize, Sequelize) => {
  const Subscriber = sequelize.define("subscriber", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
  });
  return Subscriber;
};