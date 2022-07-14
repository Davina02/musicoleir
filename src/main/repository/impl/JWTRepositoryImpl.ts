import { RegisterJWTDTO } from "../../model/dto/request/register-jwt-dto";
import JWTToken from "../../model/entity/JWTToken";
import { JWTRepository } from "../JWTRepository";
import { v4 } from 'uuid';

export class JWTRepositoryImpl implements JWTRepository {

  async registerToken(dto: RegisterJWTDTO): Promise<JWTToken> {
    
    return JWTToken.create({
      jwt_token: dto.jwt_token,
      user_id: dto.user_id,
      uuid_token: v4(),
      is_expired: JWTToken.NOT_EXPIRED,
      device_type: dto.device_type,
      created_at: new Date(),
      expired_at: dto.expired_at
    }).then(resultSet => resultSet);

  }

  async invalidateAllTokens(): Promise<void> {
    await JWTToken.update({
      is_expired: JWTToken.EXPIRED
    },{
      where: {
        is_expired: JWTToken.NOT_EXPIRED
      }
    }).then(res => res);
  }
    
  async invalidateToken(user_id: string, device_type: number): Promise<void> {
    await JWTToken.update({
        is_expired: JWTToken.EXPIRED
      },{
        where: {
          is_expired: JWTToken.NOT_EXPIRED,
          user_id: user_id,
          device_type: device_type
        }
      }).then(res => res);
  }

  async checkTokenValidity(token: string): Promise<JWTToken | null> {
    return JWTToken.findOne({
      where: {
        uuid_token: token,
        is_expired: JWTToken.NOT_EXPIRED
      }
    }).then(resultSet => resultSet);
  }

  async invalidateTokenByUserId(user_id: string): Promise<void> {
    await JWTToken.update({
      is_expired: JWTToken.EXPIRED
    },{
      where: {
        user_id: user_id,
        is_expired: JWTToken.NOT_EXPIRED
      }
    }).then(resultSet => resultSet);

  }
    
}

export default new JWTRepositoryImpl();