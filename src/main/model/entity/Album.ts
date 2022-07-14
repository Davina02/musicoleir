import { DataTypes } from 'sequelize';
import { Model, Column, Table, Default, HasOne, BelongsTo } from 'sequelize-typescript';
import Music from './Music';
import Musician from './Musician';

/**
 * AlbumInterface
 *
 * @hidable_parameters
 *  is_delete
 */
 export interface AlbumItf {
  id?: number | null
  musician_id: number
  title: string
  is_deleted?: number | null
}

@Table({
    tableName    : 'albums',
    timestamps   : true,
    paranoid    : true,
    underscored  : true
})
class Album extends Model implements AlbumItf {

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
    field: "musician_id",
    type: DataTypes.INTEGER,
    allowNull: false
  })
  musician_id!: number;

  @Column({
    allowNull: false,
    field: "title",
    type: DataTypes.STRING(100)
  })
  title!: string

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
  @HasOne(() => Music, "album_id")
  music!: Music;

  @BelongsTo(() => Musician, "musician_id")
  musician!: Musician;

}

export default Album;