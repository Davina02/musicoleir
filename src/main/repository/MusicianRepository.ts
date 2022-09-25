import { AsyncManualPagination } from "../common/facade/ManualPagination";
import { CreateMusicianDTO } from "../model/dto/request/create-musician-dto";
import { PaginationRequestDto } from "../model/dto/request/pagination-request-dto";
import { UpdateMusicianDTO } from "../model/dto/request/update-musician-dto";
import Musician from "../model/entity/Musician";


export interface MusicianRepository {

  /**
   * updateMusician
   *  A repository to update musician data.
   *
   * @return User
   *  Return null if musician with requested id not exist
   */
  updateMusician(request: UpdateMusicianDTO): Promise<Musician | null>;
  
  /**
   * findMusicianById
   *  A repository to find musician data by id.
   * 
   * @param number id
   * 
   * @return /model/entity/Musician
   */
  findMusicianById(id: number): Promise<Musician | null>;

  /**
   * findMusicianByName
   *  A repository to find musician data by name.
   * 
   * @param number name
   * 
   * @return /model/entity/Musician
   */
  findMusicianByName(name: string): Promise<Musician | null>;

  /**
   * getAllMusician
   *  A repository to get all musician data.
   * 
   * @return Array<Musician>
   */
  getAllMusician(): Promise<Musician[]>;

  /**
   * getAllMusicians
   *  A repository to get all musician data.
   * 
   *  Paginate this data by 12.
   * 
   */
  getAllMusicians(request: PaginationRequestDto): Promise<AsyncManualPagination<Musician>>;

  /**
   * createMusician
   *  A repository to create new Musician by
   *  designed DTO.
   * 
   * @return Musician
   */
  createMusician(request: CreateMusicianDTO): Promise<Musician>;

  /**
   * deleteMusician
   *  A repository to delete musician by id
   * 
   * @return Musician
   */
  deleteMusician(id: number): Promise<null>;

}