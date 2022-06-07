const userService = require('../service/user.service');
const bookService = require('../service/book.service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/error');




exports.registration = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка при валидации!', errors.array()))
        }
        const { name, surname, email, login, password } = req.body;
        const userData = await userService.registration(name, surname, email, login, password);
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.json(userData);
    } catch (e) {
        next(e);
        // console.log("ERROR REGISTER");
    }
}


exports.login = async (req, res, next) => {
    try {
        const { login, password } = req.body;
        const userData = await userService.login(login, password);
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}


exports.logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const token = await userService.logout(refreshToken);
        res.clearCookie('refreshToken')
        return res.json(token);
    } catch (e) {
        next(e);
    }
}

exports.activate = async (req, res, next) => {
    try {
        const activationLink = req.params.link;
        await userService.activate(activationLink);
        return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
        next(e);
    }
}

exports.refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const userData = await userService.refresh(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        return res.json(users);
    } catch (e) {
        next(e);
    }
}
exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await bookService.getBooks();
        return res.json(books);
    } catch (e) {
        next(e);
    }
}
exports.getBook = async (req, res, next) => {
    const id = req.params.id;
    try {
        const book = await bookService.getBook(id);
        return res.json(book);
    } catch (e) {
        next(e);
    }
}
exports.getComments = async (req, res, next) => {
    try {
        const coms = await userService.getComments();
        return res.json(coms);
    } catch (e) {
        next(e);
    }
}
exports.addComment = async (req, res, next) => {
    try {
        const { idCard,
            text,
            parentId,
            userId,
            createdAt } = req.body;
        const comment = await userService.addComment(idCard,
            text,
            parentId,
            userId,
            createdAt);
        return res.json(comment);
    } catch (e) {
        next(e);
    }

}
exports.deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.body;
        await userService.deleteComment(commentId);
        return res.json({ success: true });
    } catch (e) {
        next(e);
    }
}
exports.updateComment = async (req, res, next) => {
    try {
        const { text, commentId } = req.body;
        await userService.updateComment(text, commentId);
        return res.json({ success: true });
    } catch (e) {
        next(e);
    }
}