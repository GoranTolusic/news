import dotenv from 'dotenv';
import UserService from '../src/services/UserService';
import Container from 'typedi';
import { User } from '../src/entity/User';
import * as bcrypt from 'bcrypt';
import { uid } from 'uid';
import { exit } from 'process';
dotenv.config();

console.log('PREPARING FOR SEED ADMINS')
async function runSeedProcess() {
    const salt = await bcrypt.genSalt();
    const service = Container.get(UserService)
    let admin = new User()

    //Set some random properties for user admin
    admin.alias = "Main Admin"
    admin.email = String(process.env.ADMIN_EMAIL)
    admin.password = await bcrypt.hash(String(process.env.ADMIN_PASSWORD), salt) 
    admin.firstName = "Pero"
    admin.lastName = "Perić"
    admin.role = "admin"
    admin.verified = true
    admin.verifyToken = uid(32)
    admin.createdAt = Date.now()
    admin.updatedAt = Date.now()

    //insert admin to database
    let saved = await service.userRepository.save(admin)
    if (saved) exit()
}

runSeedProcess()





