import { Forbidden, NotFound, Unauthorized } from "@tsed/exceptions";
import { Service } from "typedi";
import { AppDataSource } from "../helpers/data-source";
import { User } from "../entity/User";
import HashService from "./HashService";
import JWTService from "./JWTService";
import { omit } from "lodash"
import nodemailer from "nodemailer"
import { ObjectLiteral } from "typeorm";

@Service()
class AuthService {
    private userRepository
    
    constructor(private hashService: HashService,
        private jwtService: JWTService) {
        this.userRepository = AppDataSource.getMongoRepository(User)
    }

    async login(body: ObjectLiteral): Promise<string> {
        let user = await this.userRepository.findOneBy({
            email: body.email
        })

        //check if password matches with hashed one
        let matches = await this.hashService.comparePasswords(body.password, user?.password || '')
        if (!matches) throw new Unauthorized('Incorrect password. Try Again!')
        if (!user?.verified) throw new Forbidden('You are not verified yet, please verify your email')

        //return accessToken 
        let result = this.jwtService.generateToken(omit(user, ['password']))
        return result
    }

    async verifyToken(params: ObjectLiteral) {
        let user = await this.userRepository.findOneBy({
            verifyToken: params.verifyToken,
            verified: false
        })
        if (!user) throw new NotFound('Invalid verify Token')
        user.verified = true
        await this.userRepository.updateOne({ email: user.email }, {
            $set: {
                verified: true
            }
        })
        return true
    }

    async sendMail(created: User) {
        // Generate test SMTP service account from ethereal.email
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Sport Classes " <sports.company@example.com>',
            to: `${created.email}`,
            subject: "Verify your email", // Subject line
            text: "Hello world?", // plain text body
            html: `<b><a href="http://localhost:3000/auth/verifyEmail?verifyToken=${created.verifyToken}&userId=${created._id}">Click to Verify</a></b>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}

export default AuthService;