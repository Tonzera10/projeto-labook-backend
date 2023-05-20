import { UserDatabase } from "../database/UserDatabase";
import { AlreadyExistError } from "../error/AlreadyExist";
import { BadRequestError } from "../error/BadRequestError";
import { USER_ROLE, User } from "../models/User";


export class UserBusiness{
    constructor(private userDatabase: UserDatabase) {}

    public signupUser = async (input: any): Promise<void> => {
        const userId = await this.userDatabase.findById(input.id)
        const userEmail = await this.userDatabase.findByEmail(input.email)
        let userRole = input.role

        if (userId) {
            throw new AlreadyExistError("Id de usuário já existe!")
    
        }
        if (userEmail) {
            throw new AlreadyExistError("E-mail já existe!")
        }

        if (userRole !== USER_ROLE.ADMIN || userRole !== USER_ROLE.NORMAL) {
            throw new BadRequestError("Role inválido!")
        } 
        if (userRole === "admin"){
            userRole = USER_ROLE.ADMIN
        }
        if (userRole === "normal"){
            userRole = USER_ROLE.NORMAL
        }

        const newSignup = new User(
            input.id,
            input.name,
            input.email,
            input.password,
            input.role
        )
        await this.userDatabase.signupUser(newSignup)
    }
}