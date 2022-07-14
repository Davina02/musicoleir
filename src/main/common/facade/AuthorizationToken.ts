import config from '../../config/Config';
import jwt from 'jsonwebtoken';

import User from '../../model/entity/User';
import JWTTokenRepository from '../../repository/impl/JWTRepositoryImpl'; 

export class AuthorizationToken {

  /**
   * @static
   * @var string EXPIRATION_TIME
   * 
   * This value contains expiration time setting 
   * for Token Expiration.
   * This current value means 7 days
   * 
   * @link https://github.com/auth0/node-jsonwebtoken#readme
   */
  static EXPIRATION_TIME: string = "365d";

  /**
   * validateBearerPrefix
   *    A function that seperate "Bearer " from " {token}"
   * 
   * @param string "token with Bearer in prefix"
   * 
   * @return bool false if the Bearer is not exist
   * @return string token if Bearer exists
   */
  private validateBearerPrefix(token: string): boolean | string {
    
    const bearer: Array<string> = token.split(" ");

    return (bearer[0] !== "Bearer") ? false : bearer[1];
  }

  /**
   * getRealToken
   * 
   * @param string uuid
   *    Reference to uuid_token in uma_tbl_jwt_token
   * 
   * @return string jwt_token
   */
  private async getRealToken(uuid: string): Promise<string> {
    const jwtToken = await JWTTokenRepository.checkTokenValidity(uuid);

    if(jwtToken == null){

      throw 'false';

    }

    return jwtToken!.jwt_token!;
  }
  
  public async generateAccessToken(user: User, device_type: number): Promise<string> {
    const jwt_token: string = jwt.sign(
      user.toJSON(), 
      config.jwt.secret_key, 
      {
        expiresIn: AuthorizationToken.EXPIRATION_TIME
      }
    );

    /**
     * Invalidate Token
     */
    JWTTokenRepository.invalidateToken(
      user.id!.toString(),
      device_type
    );

    /**
     * Register Token
     */
    const token = await JWTTokenRepository.registerToken({
      jwt_token: jwt_token,
      user_id: user.id!.toString(),
      device_type: device_type,
      expired_at: new Date(new Date().setDate(new Date().getDate() + 7)),
    })

    return token!.uuid_token;
  }

  /**
   * Get current user with requested token
   */
  public async getMe(token: string): Promise<any> {

    const valid: any = await this.validateToken(token);

    let valid_token: string | boolean = "";

    if(valid == false) return false;
    else {
      valid_token = this.validateBearerPrefix(token);
    }

    const decrypted = await this.getRealToken(valid_token.toString());

    /**
     * Decoding JWT
     */
    return jwt.verify(
      decrypted,
      config.jwt.secret_key
    );
  }

  /**
   * Check token validity
   */
  public async validateToken(token: string): Promise<boolean> {

    try{
      /**
       * Check if token had Bearer prefix 
       */
      const valid_token: any = this.validateBearerPrefix(token);

      if(valid_token === false) throw 'false';

      /**
       * Check the if the token is expired or not.
       */

      const decrypted_token: string = await this.getRealToken(valid_token);


      /**
       * Verify if the saved token is valid or not.
       */
      const verified = jwt.verify(decrypted_token, config.jwt.secret_key);

      if(!verified) throw 'false';

      return true;
      
    }catch (error) {

      return false;
    }
  }

  public async invalidateTokenByUserId(user_id: string): Promise<void> {

    await JWTTokenRepository.invalidateTokenByUserId(user_id);

  }
}