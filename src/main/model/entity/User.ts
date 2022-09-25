import { DataTypes } from 'sequelize';
import { Model, Column, Table, Default } from 'sequelize-typescript';

/**
 * UserInterface
 *
 * @hidable_parameters
 *  password
 *  is_delete
 */
export interface UserItf {
  id?: number | null
  full_name: string
  username: string
  password?: string | null
  is_deleted?: number | null
}

@Table({
    tableName    : 'users',
    timestamps   : true,
    paranoid    : true,
    underscored  : true
})
class User extends Model implements UserItf {

  /**
   * @var array
   * hidden
   *  Hide attributes with variable names below
   */
  private hidden = [
    'password',
    'is_deleted'
  ];

  @Column({
    autoIncrement: true,
    primaryKey: true,
    field: "id",
    type: DataTypes.INTEGER
  })
  id?: number | null;

  @Column({
    allowNull: false,
    field: "full_name",
    type: DataTypes.STRING(100)
  })
  full_name!: string

  @Column({
    allowNull: false,
    field: "username",
    type: DataTypes.STRING(100)
  })
  username!: string;

  @Column({
    allowNull: false,
    field: "password",
    comment: "Make sure this is encrypted!!!",
    type: DataTypes.TEXT
  })
  password?: string | null;

  @Default(0)
  @Column({
    allowNull: false,
    field: "is_deleted",
    comment: "0: Not Deleted | 1: Deleted",
    type: DataTypes.SMALLINT
  })
  is_deleted?: number | null;

  /**
   * toJSON
   *  Sequelize function settings to cast this model
   *  into JSON
   */
  toJSON () {
    // hide hidden fields
    let attributes = Object.assign({}, this.get())
    for (let a of this.hidden) {
      delete attributes[a]
    }
    return attributes
  }

}

export default User;