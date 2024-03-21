module.exports = (sequelize, Sequelize) => {
  const Blogpost_keyword = sequelize.define('blogpost_keyword', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // blogpostId: {
    //   type: Sequelize.INTEGER
    // },
    // keywordId: {
    //   type: Sequelize.INTEGER
    // }
  });
  Blogpost_keyword.associate = function (models) {
    Blogpost_keyword.belongsTo(models.blogpost);
    Blogpost_keyword.belongsTo(models.keyword);
  };
  return Blogpost_keyword;
};
