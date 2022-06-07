const ApiError = require('../exceptions/error')
const tokenService = require('../service/token.service');

module.exports = function (err, req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ApiError.UnauthError());
        }

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthError());
    }
}