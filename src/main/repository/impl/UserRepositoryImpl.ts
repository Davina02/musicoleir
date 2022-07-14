import { UserNotFoundException } from '../../common/exception/UserNotFoundException';
import { AsyncManualPagination } from '../../common/facade/ManualPagination';
import { CreateUserDTO } from '../../model/dto/request/CreateUserDTO';
import { PaginationRequestDto } from '../../model/dto/request/pagination-request-dto';
import { UpdateFullnameDTO } from '../../model/dto/request/update-fullname-dto';
import { UpdateUserDTO } from '../../model/dto/request/update-user-dto';
import User from '../../model/entity/User';
import { UserRepository } from '../UserRepository';

class UserRepositoryImpl implements UserRepository {

  updateUser = async (request: UpdateUserDTO): Promise<User | null> => {
    const execution = await User.findOne({
      where: {
        id: request.user_id,
        is_deleted: 0
      }
    }).then(resultSet => {
      return resultSet;
    });

    if(execution === null){
      throw new UserNotFoundException();
    }

    execution.full_name = request.full_name;
    execution.username = request.username;

    if (request.password != null) {
      execution.password = request.password;
    }

    await execution.save();
    return execution;
  }

  updateFullname = async (request: UpdateFullnameDTO): Promise<User | null> => {
    const execution = await User.findOne({
      where: {
        id: request.user_id,
        is_deleted: 0
      }
    }).then(resultSet => {
      return resultSet;
    });

    if(execution === null){
      throw new UserNotFoundException();
    }

    execution.full_name = request.full_name;

    await execution.save();
    return execution;
  }

  findUserById = async(id: number): Promise<User> =>
    User.findOne({
      where: {
        is_deleted: 0,
        id: id
      }
    }).then(resultSet => {
      if(resultSet === null) throw new UserNotFoundException();

      return resultSet;
    });

  findUserByUsername = async(username: string): Promise<User | null> =>
    User.findOne({
      where: {
        is_deleted: 0,
        username: username
      }
    }).then(resultSet => {
      if(resultSet === null) throw new UserNotFoundException();

      return resultSet;
    });

  getAllUser = async(): Promise<Array<User>> => User.findAll({where: {is_deleted: 0}});

  getAllUsers = async(dto: PaginationRequestDto): Promise<AsyncManualPagination<User>> => {
    return (new AsyncManualPagination<User>().getInstance(
      await User.findAll({
        where: {
          is_deleted: 0
        },
        offset: (dto.page ?? 1) * 12,
        limit: dto.perPage ?? 12,
      }),
      dto.link,
      dto.page!,
      dto.perPage!
    ))
  }

  createUser = async (request: CreateUserDTO): Promise<User> => {
    return User.create({
      full_name: request.full_name,
      username: request.username,
      password: request.password || null,
    });
  }

  deleteUser = async(id: number): Promise<null> => {
    await User.update({
      is_deleted: 1,
    }, {
      where: {
        id: id,
        is_deleted: 0
      }
    }).then(resultSet => resultSet);

    return null;
  }
    
}

export default new UserRepositoryImpl();