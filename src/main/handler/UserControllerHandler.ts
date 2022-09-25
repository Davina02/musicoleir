import { UsernameAlreadyExistsException } from "../common/exception/UsernameAlreadyExistsException";
import { UserNotFoundException } from "../common/exception/UserNotFoundException";
import { Encryption } from "../common/facade/Encryption";
import { AsyncManualPagination, ManualPagination } from "../common/facade/ManualPagination";
import { PaginationRequestDto } from "../model/dto/request/pagination-request-dto";
import User from "../model/entity/User";
import UserRepositoryImpl from "../repository/impl/UserRepositoryImpl";

export class UserControllerHandler {

    public async getAllBOUsers(page: any, perPage: any, link: string): Promise<AsyncManualPagination<User>> {

        const dto: PaginationRequestDto = ManualPagination.generatePaginationRequest(
            page,
            perPage,
            link
        )

        const result = await UserRepositoryImpl.getAllUsers(dto);

        return result;
    }

    public async getAllBOUser(): Promise<Array<User>> {
        return await UserRepositoryImpl.getAllUser();
    }

    public async createBOUser(full_name: string, username: string, password: string): Promise<User> {
        const dto = {
            full_name: full_name,
            username: username,
            password: Encryption.hash(password)
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
        const result = await UserRepositoryImpl.createUser(dto);

        return result;
    }

    public async updateBOUser(user_id: number, full_name: string): Promise<User> {
        const dto = {
            user_id: user_id,
            full_name: full_name
        }

        const user = await UserRepositoryImpl.updateFullname(dto);

        return user!;
    }

    public async deleteBOUser(user_id: number) {
        const resultSet = await UserRepositoryImpl.findUserById(user_id);

        if (resultSet == null) {
            throw new UserNotFoundException();
        }

        await UserRepositoryImpl.deleteUser(user_id);
    }

}