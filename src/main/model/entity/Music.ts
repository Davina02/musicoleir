import { DataTypes } from 'sequelize';
import { Model, Column, Table, Default, HasOne, BelongsTo } from 'sequelize-typescript';
import Album from './Album';

/**
 * MusicInterface
 *
 * @hidable_parameters
 *  is_delete
 */
 export interface MusicItf {
  id?: number | null
  album_id: number
  title: string
  duration: string
  is_deleted?: number | null
}

@Table({
    tableName    : 'musics',
    timestamps   : true,
    paranoid    : true,
    underscored  : true
})
class Music extends Model implements MusicItf {

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
    field: "album_id",
    type: DataTypes.INTEGER,
    allowNull: false
  })
  album_id!: number;

  @Column({
    allowNull: false,
    field: "title",
    type: DataTypes.STRING(100)
  })
  title!: string

  @Column({
    allowNull: false,
    field: "duration",
    type: DataTypes.STRING(6)
  })
  duration!: string

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
  @BelongsTo(() => Album, "album_id")
  album!: Album;

}

export default Music;