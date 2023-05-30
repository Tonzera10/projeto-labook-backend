import { UserDatabase } from "../database/UserDatabase";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/userDTO/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/userDTO/signup.dto";
import { AlreadyExistError } from "../error/AlreadyExist";
import { NotFoundError } from "../error/NotFoundError";
import { TokenPayload, USER_ROLES, User, UserDB } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public signupUser = async (
    input: SignupInputDTO
  ): Promise<SignupOutputDTO> => {
    const { name, email, password } = input;

    const id = this.idGenerator.generate();

    const userEmail = await this.userDatabase.findByEmail(email);

    if (userEmail) {
      throw new AlreadyExistError("E-mail já existe!");
    }

    const newSignup = new User(
      id,
      name,
      email,
      password,
      USER_ROLES.NORMAL,
      new Date().toISOString()
    );

    const newSignupDB: UserDB = {
      id: newSignup.getId(),
      name: newSignup.getName(),
      email: newSignup.getEmail(),
      password: newSignup.getPassword(),
      role: newSignup.getRole(),
      created_at: newSignup.getCreatedAt(),
    };

    await this.userDatabase.signupUser(newSignupDB);

    const tokenPayload: TokenPayload = {
      id: newSignup.getId(),
      name: newSignup.getName(),
      role: newSignup.getRole(),
    };

    const token = this.tokenManager.createToken(tokenPayload);

    const output: SignupOutputDTO = {
      message: "Cadastro realizado  com sucesso!",
      token: token,
    };

    return output;
  };

  public loginUser = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input;

    const userDB = await this.userDatabase.findByEmail(email);
    if (!userDB) {
      throw new NotFoundError("Email não encontrado!");
    }
    
    if (userDB.password !== password) {
      throw new NotFoundError("Senha incorreta!");
    }

    const user = new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
    )

    const tokenPayload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole()
    };
    const token = this.tokenManager.createToken(tokenPayload);

    const output: LoginOutputDTO = {
      message: "Login realizado com sucesso!",
      token: token,
    };

    return output;
  };
}
