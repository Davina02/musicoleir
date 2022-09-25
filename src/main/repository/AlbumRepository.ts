import { AsyncManualPagination } from "../common/facade/ManualPagination";
import { CreateAlbumDTO } from "../model/dto/request/create-album-dto";
import { PaginationRequestDto } from "../model/dto/request/pagination-request-dto";
import { UpdateAlbumDTO } from "../model/dto/request/update-album-dto";
import Album from "../model/entity/Album";


export interface AlbumRepository {

  /**
   * updateAlbum
   *  A repository to update album data.
   *
   * @return User
   *  Return null if album with requested id not exist
   */
  updateAlbum(request: UpdateAlbumDTO): Promise<Album | null>;
  
  /**
   * findAlbumById
   *  A repository to find album data by id.
   * 
   * @param number id
   * 
   * @return /model/entity/Album
   */
  findAlbumById(id: number): Promise<Album | null>;

  /**
   * findAlbumByTitle
   *  A repository to find album data by title.
   * 
   * @param number title
   * 
   * @return /model/entity/Album
   */
  findAlbumByTitle(title: string): Promise<Album | null>;

  /**
   * getAllAlbumByMusician
   *  A repository to get all album data.
   * 
   * @return Array<Album>
   */
  getAllAlbumByMusician(musician_id: number): Promise<Album[]>;

  /**
   * getAllAlbumsByMusician
   *  A repository to get all musician data.
   * 
   *  Paginate this data by 12.
   * 
   */
  getAllAlbumsByMusician(musician_id: number, dto: PaginationRequestDto): Promise<AsyncManualPagination<Album>>;

  /**
   * createAlbum
   *  A repository to create new Album by
   *  designed DTO.
   * 
   * @return Musician
   */
  createAlbum(request: CreateAlbumDTO): Promise<Album>;

  /**
   * deleteAlbum
   *  A repository to delete musician by id
   * 
   * @return Musician
   */
  deleteAlbum(id: number): Promise<null>;

}