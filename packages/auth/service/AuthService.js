const {PrismaClient} = require("@prisma/client");
const bcrypt = require("bcrypt");
const UserDto = require("../../../dto/UserDto");
const ApiError = require("../../../exceptions/ApiError");

const TokenService = require("./TokenService");

class AuthService {
    prisma = new PrismaClient()
    userDB = this.prisma.users

    async register(email, password) {
        const candidate = await this.userDB.findFirst({where: {email}})
        if (candidate) throw ApiError.BadRequest(`Пользователь с почтовый адресом ${email} уже существует`)

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await this.userDB.create({data: {email, password: hashPassword}})

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async login(email, password) {
        const user = await this.userDB.findFirst({where: {email}})
        if (!user) throw ApiError.BadRequest('Непральные данные для входа')

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) throw ApiError.BadRequest('Непральные данные для входа')

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const userData = await TokenService.removeToken(refreshToken)
        return new UserDto(userData)
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError()
        return await TokenService.refreshToken(refreshToken)
    }
}

module.exports = new AuthService()