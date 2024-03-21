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
    Blogpost.belongsTo(models.user);
    Blogpost.belongsToMany(models.keyword, {through: models.blogpost_keyword});
    // Blogpost.hasMany(models.blogpost_keyword)
  };
  return Blogpost;
};
