const db = require("../models");
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../service/mail.service');
const tokenService = require('../service/token.service');
const UserDto = require('../dtos/user.dto');
const ApiError = require('../exceptions/error');

const User = db.user;
const Comment = db.comment;

exports.registration = async (name, surname, email, login, password) => {
    const candidate = await User.findOne({
        where: {
            email
        }
    })
    if (candidate) {
        throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
    };
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();


    const user = await User.create({ name, surname, email, login, password: hashPassword })
    await mailService.activationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);


    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto }

}

exports.activate = async (activationLink) => {
    const user = await User.findOne({ activationLink })
    if (!user) {
        throw ApiError.BadReq('Неккоректная ссылка активации')
    }
    user.isActivated = true;
    await user.save();
}

exports.login = async (login, password) => {
    const user = await User.findOne({
        where: {
            login
        }
    })
    if (!user) {
        throw ApiError.BadRequest(`Пользователь с логином ${login} не существует`)
    };
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
        throw ApiError.BadRequest(`Неверный пароль!`)
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto }
}
exports.logout = async (refreshToken) => {
    const token = await tokenService.removeToken(refreshToken)
    return token
}
exports.refresh = async (refreshToken) => {
    if (!refreshToken) {
        throw ApiError.UnauthError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenDb) {
        throw ApiError.UnauthError();
    }
    const user = await User.findByPk(userData.id)
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto }
}

exports.getUsers = async () => {
    const users = await User.findAll();
    return users;
}
exports.getComments = async () => {
    const coms = await Comment.findAll();
    return coms;
}

exports.addComment = async (idCard,
    text,
    parentId,
    userId,
    createdAt) => {
    console.log(text);
    const comment = await Comment.create({ book_id: idCard, user_id: userId, text, parentId, createdAt })
    return { comment }
}
exports.deleteComment = async (commentId) => {
    await Comment.destroy({
        where: {
            id: commentId
        }
    })
    return { success: true }
}
exports.updateComment = async (text, commentId) => {
    await Comment.update({ text: text }, {
        where: {
            id: commentId
        }
    })
    return { success: true }
}