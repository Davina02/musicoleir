import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';
import { PaginationRequestDto } from '../../model/dto/request/pagination-request-dto';
import { ManualPagination } from '../../common/facade/ManualPagination';
import UserRepositoryImpl from '../../repository/impl/UserRepositoryImpl';
import StandardPaginationValidation from '../../common/validation/glo/StandardPaginationValidation';
import CreateUserValidation from '../../common/validation/cms/uma/CreateUserValidation';
import { validationResult } from 'express-validator';
import RequestValidationException from '../../common/exception/RequestValidationException';
import { UsernameAlreadyExistsException } from '../../common/exception/UsernameAlreadyExistsException';
import User from '../../model/entity/User';
import { Encryption } from '../../common/facade/Encryption';
import UpdateUserValidation from '../../common/validation/cms/uma/UpdateUserValidation';
import { UserNotFoundException } from '../../common/exception/UserNotFoundException';
import IdValidation from '../../common/validation/cms/IdValidation';

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
    app.get("/get-all-back-office-user", StandardPaginationValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        const dto: PaginationRequestDto = ManualPagination.generatePaginationRequest(
            request.query.page,
            12,
            request.protocol + "://" + request.get('host') + request.baseUrl + request.path
        )

        const resultSet = await UserRepositoryImpl.getAllUsers(dto);

        return BaseResponse.ok(
            resultSet,
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
    app.post("/create-back-office-user", CreateUserValidation, async (request: Request, response: Response) => {
        /**
         * Request Validator
         */
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new RequestValidationException(
                errors.array()
            );
        }

        const dto = {
            full_name: request.body.full_name,
            username: request.body.username,
            password: Encryption.hash(request.body.password)
        }

        /**
         * Check if username is already occupied
         */
        if (await UserRepositoryImpl.findUserByUsername(dto.username) != null) {
            throw new UsernameAlreadyExistsException();
        }

        /**
         * Create user
         */
        const user: User = await UserRepositoryImpl.createUser(dto);

        return BaseResponse.ok(
            user,
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
    app.put("/update-back-office-user", UpdateUserValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        const dto = {
            user_id: request.body.id,
            full_name: request.body.full_name
        }

        return BaseResponse.ok(
            await UserRepositoryImpl.updateFullname(dto),
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
    app.delete("/delete-back-office-user", IdValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        const id: number = request.body.id;
        const resultSet = await UserRepositoryImpl.findUserById(id);

        if (resultSet == null) {
            throw new UserNotFoundException();
        }

        await UserRepositoryImpl.deleteUser(id);

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
