import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';

import { LoginResponseDTO } from '../../model/dto/response/login-response-dto';

import LoginRequestValidation from '../../common/validation/cms/auth/LoginRequestValidation';
import ChangePasswordValidation from '../../common/validation/cms/auth/ChangePasswordValidation';

import { AuthControllerHandler } from '../../handler/auth/AuthControllerHandler';

import { AuthorizationToken } from '../../common/facade/AuthorizationToken';
import { Encryption } from '../../common/facade/Encryption';

import JWTToken from '../../model/entity/JWTToken';
import User from '../../model/entity/User';

import UserRepositoryImpl from '../../repository/impl/UserRepositoryImpl';

import { UserNotFoundException } from '../../common/exception/UserNotFoundException';

const app = express.Router();

class AuthController extends Controller {

  public routes = (): express.Router => {

    /**
     * Login
     * 
     * An API to authenticate user by inputting his credentials:
     * - Username
     * - Password
     * 
     * If the credentials are right, return token.
     * 
     * This API uses UMA0002 to indicate not authorized user even the only wrong is the passowrd.
     * 
     * @see src/main/common/validation/cms/auth/LoginRequestValidation
     * 
     * @return 
     */
    app.post("/auth/login", LoginRequestValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        const AuthHandler = new AuthControllerHandler();

        /**
         * Check user existences and password checking.
         */
        const user: User = await AuthHandler.login(
            request.body.username,
            request.body.password,
        );
    
        /**
         * Token Handshake
         */
        new AuthorizationToken().invalidateTokenByUserId(user.id!.toString());
        const accessToken = await new AuthorizationToken().generateAccessToken(user, JWTToken.WEB);
    
        const data: LoginResponseDTO = AuthHandler.generateLoginResponseDTO(
            user.id!,
            user.full_name,
            user.username,
            accessToken
        );
    
    
        return BaseResponse.ok(
            data,
            "Pengguna terautentikasi",
            response
        );

    });

    /**
     * Change Password
     * An API to change password
     * 
     * @param request
     * @param response
     */
    app.post("/auth/change-password", ChangePasswordValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        let token: string | undefined;

        if (request.body.code !== undefined) {
            token = request.body.code;
        } else {
            token = request.body.token;
        }
    
        if (token === undefined) {
            throw new Error("Parameter 'code' atau 'token' tidak ditemukan");
        }

        let user: User | null = await UserRepositoryImpl.findUserByUsername(request.body.username);

        if (user == null) {
            throw new UserNotFoundException();
        }

        await UserRepositoryImpl.updateUser({
            user_id: user.id!,
            full_name: user.full_name,
            username: user.username,
            password: Encryption.hash(request.body.password)
        });

        user = await UserRepositoryImpl.findUserByUsername(request.body.username);

        let accessToken: string | null = null;
        let response_message = "Kata sandi anda berhasil diubah. Silahkan masuk ke aplikasi Paspor Online.";
        new AuthorizationToken().invalidateTokenByUserId(user!.id!.toString());
    
        response_message = "Pengguna terautentikasi";
    
        const data = new LoginResponseDTO();
        data.id = user!.id!;
        data.full_name = user!.full_name;
        data.username = user!.username;
        data.token = accessToken;
    
        return BaseResponse.ok(
            data,
            response_message,
            response
        );

    });

    return app;
  }

}

export default new AuthController().routes();
