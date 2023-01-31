import { Service } from "typedi";
import { In, Like, ObjectLiteral } from "typeorm";
import { AppDataSource } from "../helpers/data-source";
import { User } from "../entity/User";
import CreateUser from "../validationTypes/CreateUser";
import { BadRequest, Forbidden, InternalServerError, NotFound, Unauthorized } from "@tsed/exceptions";
import HashService from "./HashService";
import AuthService from "./AuthService";
import { omit } from "lodash"
import UpdateUser from "../validationTypes/UpdateUser";

@Service()
class UserService {
  public userRepository
  constructor(private hashService: HashService,
    private authService: AuthService) {
    this.userRepository = AppDataSource.getMongoRepository(User)
  }

  async create(inputs: CreateUser) {
    //check if user with same email exists
    let findIfExists = await this.userRepository.findOneBy({ email: inputs.email })
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

  async update(id: number, params: UpdateUser) {
    //Fetch user
    /* let user = await this.getOne(id)

    //check unique email
    if (params.email && user.email !== params.email) {
      let findIfExists = await this.userRepository.findOneBy({ email: params.email })
      if (findIfExists) throw new Forbidden('Email already exists')
    }

    //Assign new values to existing user
    Object.assign(user, params)
    return await this.userRepository.save(user) */
    return true
  }

  async delete(id: number) {
    //Fetch user
    let user = await this.getOne(id)
    await this.userRepository.delete(id)
    return user
  }

  async filter(params: any): Promise<User[]> {
    let { limit, age, role, keyword, page } = params
    limit = limit || 10

    //Formating where clause with filter options
    let whereClause: ObjectLiteral = {}
    if (role?.length) whereClause.role = In(role)
    if (age?.length) whereClause.age = In(age)
    if (keyword && keyword.length > 3) {
      whereClause = [
        { ...whereClause, "firstName": Like(`%${keyword}%`) },
        { ...whereClause, "lastName": Like(`%${keyword}%`) }
      ]
    }

    return await this.userRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
      skip: page ? (page - 1) * limit : 0,
      where: whereClause
    })
  }

  async getOne(id: number) {
    /* let user = await this.userRepository.findOneBy({ id: id })
    if (!user) throw new NotFound('User Not Found')
    return user */
    return true
  }
}

export default UserService;