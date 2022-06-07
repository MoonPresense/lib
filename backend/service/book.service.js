const db = require("../models");
const Book = db.book;

exports.getBooks = async () => {
    const books = await Book.findAll({});
    return books;
}
exports.getBook = async (id) => {
    const book = await Book.findOne({where: {id_book: id}});
    return book;
}
