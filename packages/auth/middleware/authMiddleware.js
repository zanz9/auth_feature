import ApiError from "../../../exceptions/ApiError.js";
import TokenService from "../service/TokenService.js";

export default async function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) return next(ApiError.Forbidden("empty header"))

        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) return next(ApiError.Forbidden("invalid auth token"))

        const userData = TokenService.validateAccessToken(accessToken)
        if (!userData) return next(ApiError.Forbidden("Не авторизован"))

        req.user = userData
        next()
    } catch (e) {
        return next(e)
    }
}