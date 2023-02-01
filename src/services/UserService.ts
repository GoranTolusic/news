import { Service } from "typedi";
import { In, Like, ObjectLiteral } from "typeorm";
import { AppDataSource } from "../helpers/data-source";
import { User } from "../entity/User";
import CreateUser from "../validationTypes/CreateUser";
import { BadRequest, Forbidden, NotFound } from "@tsed/exceptions";
import HashService from "./HashService";
import AuthService from "./AuthService";
import { omit } from "lodash"

@Service()
class UserService {
  public userRepository
  constructor(private hashService: HashService,
    private authService: AuthService) {
    this.userRepository = AppDataSource.getMongoRepository(User)
  }

  async create(inputs: CreateUser) {
    if (inputs.role == 'editor' && (!inputs.firstName || !inputs.lastName)) throw new BadRequest('firstName and lastName are required for editors')
    
    //check if user with same email exists
    let findIfExists = await this.get({ email: inputs.email })
    if (findIfExists) throw new Forbidden('Email already exists')

    //hash password
    inputs.password = await this.hashService.hash(inputs.password)

    //insert user
    let created = await this.userRepository.save(inputs)

    //send email for verifying
    await this.authService.sendMail(created).catch(console.error);

    //return user without password and verifyToken information because of security issues
    return omit(created, ['password', 'verifyToken'])
  }

  async get(param: ObjectLiteral) {
    let user = await this.userRepository.findOneBy(param)
    if (!user) throw new NotFound('User Not Found')
    return user
  }
}

export default UserService;