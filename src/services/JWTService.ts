import { Service } from "typedi";
import { User } from "../entity/User";
import jwt from 'jsonwebtoken'

@Service()
class JWTService {
    generateToken(user: User): string {
        let token = jwt.sign(user, process.env.JWT_SECRET || '', { expiresIn: process.env.JWT_EXPIRES || '1h' })
        return token
    }

    verifyToken(token: string) {
        let decoded = jwt.verify(token, process.env.JWT_SECRET || '')
        return decoded
    }
}

export default JWTService;