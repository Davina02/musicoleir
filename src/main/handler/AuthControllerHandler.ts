import { UserNotFoundException } from "../common/exception/UserNotFoundException";
import { WrongPasswordException } from "../common/exception/WrongPasswordException";
import { AuthorizationToken } from "../common/facade/AuthorizationToken";
import { Encryption } from "../common/facade/Encryption";
import { LoginResponseDTO } from "../model/dto/response/login-response-dto";
import JWTToken from "../model/entity/JWTToken";
import User from "../model/entity/User";
import UserRepositoryImpl from "../repository/impl/UserRepositoryImpl";


export class AuthControllerHandler {

    public async Login(username: string, password: string): Promise<LoginResponseDTO> {
        const user: User | null = await UserRepositoryImpl.findUserByUsername(username);

        if(user === null){
          throw new WrongPasswordException();
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
          throw new WrongPasswordException();
        }

        /**
         * Token Handshake
         */
        new AuthorizationToken().invalidateTokenByUserId(user.id!.toString());
        const accessToken = await new AuthorizationToken().generateAccessToken(user, JWTToken.WEB);

        /**
         * Generate LoginResponseDTO
         */
        const data = new LoginResponseDTO();
        data.id = user.id!;
        data.full_name = user.full_name;
        data.username = user.username;
        data.token = accessToken;
            
        return data;
    }

    public async changePassword(token: string | undefined, username: string, password: string): Promise<LoginResponseDTO> {
    
        if (token === undefined) {
            throw new Error("Parameter 'code' atau 'token' tidak ditemukan");
        }

        let user: User | null = await UserRepositoryImpl.findUserByUsername(username);

        if (user == null) {
            throw new UserNotFoundException();
        }

        await UserRepositoryImpl.updateUser({
            user_id: user.id!,
            full_name: user.full_name,
            username: user.username,
            password: Encryption.hash(password)
        });

        user = await UserRepositoryImpl.findUserByUsername(username);

        if (user == null) {
            throw new UserNotFoundException();
        }

        let accessToken: string | null = null;
        new AuthorizationToken().invalidateTokenByUserId(user!.id!.toString());

        accessToken = await new AuthorizationToken().generateAccessToken(user!, JWTToken.WEB);
    
        const data = new LoginResponseDTO();
        data.id = user!.id!;
        data.full_name = user!.full_name;
        data.username = user!.username;
        data.token = accessToken;

        return data;
    }

}