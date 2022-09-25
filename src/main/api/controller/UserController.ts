import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';
import StandardPaginationValidation from '../../common/validation/glo/StandardPaginationValidation';
import CreateUserValidation from '../../common/validation/cms/uma/CreateUserValidation';
import { validationResult } from 'express-validator';
import RequestValidationException from '../../common/exception/RequestValidationException';
import UpdateUserValidation from '../../common/validation/cms/uma/UpdateUserValidation';
import IdValidation from '../../common/validation/cms/IdValidation';
import { UserControllerHandler } from '../../handler/UserControllerHandler';

const app = express.Router();

class UserController extends Controller {

  public routes = (): express.Router => {

    /**
     * Get all back office user
     * 
     * This API will show all of users that are being authorized to
     * access the back office.
     * 
     * Paginate this data by 12.
     * 
     */
    app.get("/user/all", StandardPaginationValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        return BaseResponse.ok(
            await (new UserControllerHandler().getAllBOUsers(
                request.query.page,
                12,
                request.protocol + "://" + request.get('host') + request.baseUrl + request.path
            )),
            "Success",
            response
        );

    });

    app.get("/user", async (request: Request, response: Response) => {
        super.requestValidator(request);

        return BaseResponse.ok(
            await (new UserControllerHandler().getAllBOUser()),
            "Success",
            response
        );

    });

    /**
     * Create back office user
     * 
     * This API will create user by giving username and fullname.
     * 
     */
    app.post("/user/create", CreateUserValidation, async (request: Request, response: Response) => {
        /**
         * Request Validator
         */
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new RequestValidationException(
                errors.array()
            );
        }

        return BaseResponse.ok(
            await (new UserControllerHandler().createBOUser(
                request.body.full_name,
                request.body.username,
                request.body.password
            )),
            "Success",
            response
        );

    });

    /**
     * Update back office user
     * 
     * This API will update the chosen user's data's full name.
     * 
     */
    app.put("/user/update", UpdateUserValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        return BaseResponse.ok(
            await (new UserControllerHandler().updateBOUser(
                request.body.id,
                request.body.full_name
            )),
            "Success",
            response
        );
    });

    /**
     * Delete back office user
     * 
     * This API will delete the chosen user's data.
     * 
     */
    app.delete("/user/delete", IdValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        await new UserControllerHandler().deleteBOUser(request.body.id);

        return BaseResponse.ok(
            null,
            "Success",
            response
        );
    });

    return app;
  }

}

export default new UserController().routes();
