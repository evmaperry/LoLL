module.exports = (sequelize, Sequelize) => {
  const Keyword = sequelize.define('keyword', {
    keyword: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  Keyword.associate = function (models) {
    Keyword.belongsToMany(models.blogpost, { through: 'blogpost_keywords'});
  };
  return Keyword;
};