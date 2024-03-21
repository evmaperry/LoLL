module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Blogposts', [{
      title: 'Shoreline planting planned for July 5th',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      category: 'shoreline',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
  }]);

    await queryInterface.bulkInsert('Keywords', [{
      keyword: 'event',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('Blogpost_keywords', [{
      keywordId: 1,
      blogpostId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Keywords', null, {});
    await queryInterface.bulkDelete('Blogposts', null, {});
  },
};
