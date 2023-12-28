import { connection } from "../database/knex/index.js"
import AppError from "../utils/appError.js"
import bcrypt from "bcryptjs"
import authConfig from "../configs/auth.js"
import jwt from "jsonwebtoken"

export class SessionsController {
    async create(request, response) {
        const { email, password} = request.body

        const user = await connection("users").where({email}).first()

        if(!user) {
            throw new AppError('E-mail e/ou senha incorreta', 401)
        }

        const passwordMatched = await bcrypt.compare(password, user.password)

        if(!passwordMatched) {
            throw new AppError("E-mail e/ou senha incorreta", 401)
        }

        const { secret, expiresIn} = authConfig.jwt
        const token = jwt.sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })


        return response.json({user, token})
    }
}   