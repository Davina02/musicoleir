import { DataTypes } from 'sequelize';
import { Model, Column, Table, Default } from 'sequelize-typescript';

/**
 * CustomerInterface
 *
 * @hidable_parameters
 *  password
 *  is_delete
 */
export interface CustomerItf {
  id?: number | null
  full_name: string
  email: string
  password?: string | null
  is_deleted?: number | null
}

@Table({
    tableName    : 'customers',
    timestamps   : true,
    paranoid    : true,
    underscored  : true
})
class Customer extends Model implements CustomerItf {

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
    field: "email",
    type: DataTypes.STRING(100)
  })
  email!: string;

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

  /**
   * Virtual Attributes
   */
  @Column({
    type: DataTypes.VIRTUAL(DataTypes.STRING)
  })
  get some_virtual_attributes(): string {
    return `${this.getDataValue('full_name')} ${this.getDataValue('email')}`;
  }


}

export default Customer;