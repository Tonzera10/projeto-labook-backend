import { User, UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {
    private TABLE_NAME = "users"

    public getAllUsers = async (): Promise<UserDB[]> => {
        const userDB = await BaseDatabase.connection(this.TABLE_NAME)
        return userDB
    }

    public findById = async (id: string): Promise<UserDB | undefined> => {
        const [userDB] = await BaseDatabase.connection(this.TABLE_NAME).where({id})
        return userDB
    }

    public findByEmail = async (email: string): Promise<UserDB | undefined> => {
        const [userDB] = await BaseDatabase.connection(this.TABLE_NAME).where({email})
        return userDB
    }
    
    public signupUser = async (input: UserDB):Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME).insert({
            name: input.name,
            email: input.email,
            password: input.password
        })
    }
}