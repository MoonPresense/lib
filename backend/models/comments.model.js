module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
      user_id: {
        type: Sequelize.INTEGER
      },
      book_id: {
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      parentId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      }
    });
  
    return Comment;
  };
  