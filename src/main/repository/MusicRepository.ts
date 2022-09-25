import { AsyncManualPagination } from "../common/facade/ManualPagination";
import { CreateMusicDTO } from "../model/dto/request/create-music-dto";
import { PaginationRequestDto } from "../model/dto/request/pagination-request-dto";
import { UpdateMusicDTO } from "../model/dto/request/update-music-dto";
import Music from "../model/entity/Music";

export interface MusicRepository {

  /**
   * updateMusic
   *  A repository to update music data.
   *
   * @return User
   *  Return null if music with requested id not exist
   */
  updateMusic(request: UpdateMusicDTO): Promise<Music | null>;
  
  /**
   * findMusicById
   *  A repository to find music data by id.
   * 
   * @param number id
   * 
   * @return /model/entity/Music
   */
  findMusicById(id: number): Promise<Music | null>;

  /**
   * findMusicByTitle
   *  A repository to find music data by title.
   * 
   * @param number title
   * 
   * @return /model/entity/Music
   */
  findMusicByTitle(title: string): Promise<Music | null>;

  /**
   * getAllMusicByAlbum
   *  A repository to get all music data.
   * 
   * @return Array<Music>
   */
  getAllMusicByAlbum(album_id: number): Promise<Music[]>;

  /**
   * getAllMusicsByAlbum
   *  A repository to get all music data.
   * 
   *  Paginate this data by 12.
   * 
   */
  getAllMusicsByAlbum(album_id: number, dto: PaginationRequestDto): Promise<AsyncManualPagination<Music>>;

  /**
   * createMusic
   *  A repository to create new Music by
   *  designed DTO.
   * 
   * @return Music
   */
  createMusic(request: CreateMusicDTO): Promise<Music>;

  /**
   * deleteMusic
   *  A repository to delete music by id
   * 
   * @return Music
   */
  deleteMusic(id: number): Promise<null>;

}