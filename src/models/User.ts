export enum USER_ROLE {
    ADMIN = 'admin',
    NORMAL = 'normal'
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLE,
}

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLE,  
    ) { }
    
    public getId(): string{
        return this.id;
    }

    public setId(value: string): void {
        this.id = value;
    }

    public getName(): string{
        return this.name;
        }
    
    public setName(value: string): void {
        this.name = value;
        }
    
    public getEmail(): string{
        return this.email;
        }

    public setEmail(value: string): void {
        this.email = value;
        }

    public getPassword(): string{
        return this.password;
        }

    public setPassword(value: string): void {
        this.password = value;
        }

    public getRole(): USER_ROLE{
        return this.role;
    }

    public setRole(value: USER_ROLE): void{
        this.role = value;
    }
}