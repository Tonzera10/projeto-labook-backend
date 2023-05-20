import { User, UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {
    private TABLE_NAME = "users"

    public findById = async (id: string): Promise<UserDB | undefined> => {
        const [userDB] = await BaseDatabase.connection(this.TABLE_NAME).where({id})
        return userDB
    }

    public findByEmail = async (email: string): Promise<UserDB | undefined> => {
        const [userDB] = await BaseDatabase.connection(this.TABLE_NAME).where({email})
        return userDB
    }
    
    public signupUser = async (input: User):Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME).insert({
            id: input.getId(),
            name: input.getName(),
            email: input.getEmail(),
            password: input.getPassword(),
            role: input.getRole()
        })
    }
}