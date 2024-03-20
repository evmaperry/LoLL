module.exports = (sequelize, Sequelize) => {
  const Blogpost = sequelize.define('blogpost', {
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    // startDate: {
    //   type: Sequelize.DATEONLY,
    //   allowNull: false,
    // },
    // endDate: {
    //   type: Sequelize.DATEONLY,
    //   allowNull: false,
    // },
  });
  Blogpost.associate = function (models) {
    Blogpost.belongsTo(models.user);
  };
  return Blogpost;
};
