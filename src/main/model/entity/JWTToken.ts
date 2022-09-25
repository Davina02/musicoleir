import { DataTypes } from 'sequelize';
import { Model, AllowNull, AutoIncrement, Column, PrimaryKey, Table, Comment } from 'sequelize-typescript';

/**
 * JWTTokenInterface
 */

export interface JWTTokenItf {
  id: number | null;
  jwt_token: string;
  uuid_token: string;
  is_expired: number;
  device_type: number;
  created_at: Date;
  expired_at: Date | null;
}

@Table(
  {
    tableName    : 'tokens',
    timestamps   : true,
    paranoid    : true,
    underscored  : true
  }
)
class JWTToken extends Model implements JWTTokenItf {  
  /**
   * @static
   * @var number
   * Is Expired Enumeration
   */
  static EXPIRED: number = 1;
  static NOT_EXPIRED: number = 0;

  /**
   * @static
   * @var number
   * Device Type Enumeration
   */
  static MOBILE: number = 1;
  static WEB: number = 2;

  @PrimaryKey
  @AutoIncrement
  @Column(DataTypes.BIGINT)
  id!: number | null;

  @AllowNull(false)
  @Comment("JWT Token")
  @Column(DataTypes.TEXT)
  jwt_token!: string;

  @AllowNull(false)
  @Comment("UUID Encryption")
  @Column(DataTypes.TEXT)
  uuid_token!: string;

  @AllowNull(false)
  @Comment("Reference to uma_tbl_users")
  @Column(DataTypes.BIGINT)
  user_id!: string;

  @AllowNull(false)
  @Comment("An enumeration to determine whatever this token is already expired or not. 1: Expired| 0: Not Expired")
  @Column(DataTypes.SMALLINT)
  is_expired!: number;

  @AllowNull(false)
  @Comment("An enumeration to determine whatever if this token is created through mobile or cms device. 1: Mobile| 2: Web")
  @Column(DataTypes.SMALLINT)
  device_type!: number;

  @AllowNull(false)
  @Column(DataTypes.DATE)
  created_at!: Date;

  @AllowNull(true)
  @Column(DataTypes.DATE)
  expired_at!: Date | null;
}

export default JWTToken;
