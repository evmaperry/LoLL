module.exports = (sequelize, Sequelize) => {
  const Keyword = sequelize.define('keyword', {
    keyword: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    postCount: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    }
  });
  Keyword.associate = function (models) {
    Keyword.belongsToMany(models.blogpost, { through: models.blogpost_keyword});
    // Keyword.hasMany(models.blogpost_keyword);
  };
  return Keyword;
};