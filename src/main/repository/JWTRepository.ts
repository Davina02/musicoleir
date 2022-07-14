import { RegisterJWTDTO } from "../model/dto/request/register-jwt-dto";
import JWTToken from "../model/entity/JWTToken";

export interface JWTRepository {
  
  /**
   * registerToken
   * A repository that register the JWT to database.
   */
  registerToken(dto: RegisterJWTDTO): Promise<JWTToken>;

  /**
   * A repository that invalidates all existing JWT Tokens.
   */
  invalidateAllTokens(): Promise<void>;

  /**
   * invalidateToken
   * A repository that invalidate a token with 
   * requested user_id and device_type. 
   * 
   * @param string user_id
   *    Reference to user_id in uma_tbl_users
   * 
   * @param number device_type
   *    Reference to device_type in uma_jwt_token 
   */
  invalidateToken(user_id: string, device_type: number): Promise<void>;

  /**
   * checkTokenValidity
   * A repository to find a not expired token by token string.
   * 
   * @param string token
   *   Reference to uuid_token in uma_jwt_token
   */
  checkTokenValidity(token: string): Promise<JWTToken | null>;

  /**
   * invalidateTokenByUserId
   * A repository to invalidate token by User Id.
   * 
   * @param string user_id
   *    Reference to user_id in uma_tbl_users
   */
  invalidateTokenByUserId(user_id: string): Promise<void>;
}