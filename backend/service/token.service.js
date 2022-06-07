const db = require("../models");
const jwt = require("jsonwebtoken");

const Token = db.token;

exports.generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: '1d' })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '30d' })
    return {
        accessToken,
        refreshToken
    }
}


exports.saveToken = async (userId, refreshToken) => {
    const tokenData = await Token.findOne({ user: userId })
    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
}
exports.removeToken = async (refreshToken) => {
    const tokenData = await Token.destroy({where:{ refreshToken }})
    return tokenData;
}

exports.validateAccessToken = (token) => {
    try {
        const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
        return userData;
    } catch (e) {
        return null;
    }
}
exports.validateRefreshToken = (token) => {
    try {
        const userData = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
        return userData;
    } catch (e) {
        return null;
    }
}
exports.findToken = async (refreshToken) => {
    const tokenData = await Token.findOne({where:{ refreshToken }})
    return tokenData;
}