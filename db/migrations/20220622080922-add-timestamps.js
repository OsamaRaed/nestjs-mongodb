"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("users", "createdAt",
      {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      });
    await queryInterface.addColumn("users", "updatedAt",
      {
        type: Sequelize.DATE
      });
    await queryInterface.addColumn("todos", "createdAt",
      {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      });
    await queryInterface.addColumn("todos", "updatedAt",
      {
        type: Sequelize.DATE
      });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn("Users", "createdAt"),
      queryInterface.removeColumn("Users", "updatedAt"),
      queryInterface.removeColumn("todos", "createdAt"),
      queryInterface.removeColumn("todos", "updatedAt")
    ]);
  }
};
