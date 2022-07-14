import { DataTypes } from 'sequelize';
import { Model, Column, Table, Default, HasOne } from 'sequelize-typescript';
import Album from './Album';

/**
 * MusicianInterface
 *
 * @hidable_parameters
 *  is_delete
 */
 export interface MusicianItf {
  id?: number | null
  name: string
  is_deleted?: number | null
}

@Table({
    tableName    : 'musicians',
    timestamps   : true,
    paranoid    : true,
    underscored  : true
})
class Musician extends Model implements MusicianItf {

  /**
   * @var array
   * hidden
   *  Hide attributes with variable names below
   */
  private hidden = [
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
    field: "name",
    type: DataTypes.STRING(100)
  })
  name!: string

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
   * Relationship
   */
  @HasOne(() => Album, "musician_id")
  album!: Album;

}

export default Musician;