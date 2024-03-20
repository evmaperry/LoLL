module.exports = (sequelize, Sequelize) => {
  const Blogpost = sequelize.define('blogpost', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    category: {
      type: Sequelize.ENUM('get involved', 'shoreline', 'invasives'),
      allowNull: false,
    },
  });
  Blogpost.associate = function (models) {
    Blogpost.belongsToMany(models.user, {through: 'blogpost_keywords'});
  };
  return Blogpost;
};
