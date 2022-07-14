import { WrongCredentialException } from "../../common/exception/WrongPasswordException";
import { Encryption } from "../../common/facade/Encryption";
import { LoginResponseDTO } from "../../model/dto/response/login-response-dto";
import User from "../../model/entity/User";
import UserRepositoryImpl from "../../repository/impl/UserRepositoryImpl";


export class AuthControllerHandler {

  public async login(username: string, password: string): Promise<User>{
    const user: User | null = await UserRepositoryImpl.findUserByUsername(username);

    if(user === null){
      throw new WrongCredentialException();
    }
    
    /**
    * Check if string has valid hash
    */

    const valid: boolean = Encryption.compare(
      password.trim(),
      user.password!
    );

    /**
     * Case Password invalid
     */
    if(!valid){
      throw new WrongCredentialException();
    }

    return user;

  }

  public generateLoginResponseDTO = (userId: number, userFullname: string, userUsername: string, token: string): LoginResponseDTO => {
    const data = new LoginResponseDTO();
    data.id = userId;
    data.full_name = userFullname;
    data.username = userUsername;
    data.token = token;

    return data;
  }

}