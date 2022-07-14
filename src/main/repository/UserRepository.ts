import User from '../model/entity/User';
import { CreateUserDTO } from '../model/dto/request/CreateUserDTO';
import { UpdateUserDTO } from '../model/dto/request/update-user-dto';
import { UpdateFullnameDTO } from '../model/dto/request/update-fullname-dto';
import { PaginationRequestDto } from '../model/dto/request/pagination-request-dto';
import { AsyncManualPagination } from '../common/facade/ManualPagination';

export interface UserRepository {

  /**
   * updateUser
   *  A repository to update user data.
   *
   * @return User
   *  Return null if user with requested id not exist
   */
  updateUser(request: UpdateUserDTO): Promise<User | null>;

  /**
   * updateFullname
   *  A repository to update user's data's fullname.
   *
   * @return User
   *  Return null if user with requested id not exist
   */
  updateFullname(request: UpdateFullnameDTO): Promise<User | null>;
  
  /**
   * findUserById
   *  A repository to find user data by id.
   * 
   * @param number id
   * 
   * @return /model/entity/User
   */
  findUserById(id: number): Promise<User>;

  /**
   * findUserByUsername
   *  A repository to find user data by username.
   * 
   * @param username string
   * 
   * @return /model/entity/User
   */
  findUserByUsername(username: string): Promise<User | null>;

  /**
   * getAllUser
   *  A repository to get all user data.
   * 
   * @return Array<User>
   */
  getAllUser(): Promise<User[]>;

  /**
   * getAllUsers
   *  A repository to get all user data.
   * 
   *  Paginate this data by 12.
   * 
   */
  getAllUsers(request: PaginationRequestDto): Promise<AsyncManualPagination<User>>;

  /**
   * createUser
   *  A repository to create new User by
   *  designed DTO.
   * 
   * @return User
   */
  createUser(request: CreateUserDTO): Promise<User>;

  /**
   * deleteUser
   *  A repository to delete user by id
   * 
   * @return User
   */
  deleteUser(id: number): Promise<null>;

}