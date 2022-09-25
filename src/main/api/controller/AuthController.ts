import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';

import LoginRequestValidation from '../../common/validation/cms/auth/LoginRequestValidation';
import ChangePasswordValidation from '../../common/validation/cms/auth/ChangePasswordValidation';

import { AuthControllerHandler } from '../../handler/AuthControllerHandler';

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
     */
    app.post("/auth/login", LoginRequestValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        return BaseResponse.ok(
            await (new AuthControllerHandler().Login(
                request.body.username,
                request.body.password
            )),
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
    
        return BaseResponse.ok(
            await (new AuthControllerHandler().changePassword(
                request.body.token,
                request.body.username,
                request.body.password
            )),
            "Kata sandi anda berhasil diubah. Silahkan masuk ke aplikasi Musicoleir.",
            response
        );

    });

    return app;
  }

}

export default new AuthController().routes();
