module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
      id_book: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.BLOB
      },
      genre: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Book;
  };
  