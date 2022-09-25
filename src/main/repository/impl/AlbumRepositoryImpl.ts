import { AlbumNotFoundException } from "../../common/exception/AlbumNotFoundException";
import { AsyncManualPagination } from "../../common/facade/ManualPagination";
import { CreateAlbumDTO } from "../../model/dto/request/create-album-dto";
import { PaginationRequestDto } from "../../model/dto/request/pagination-request-dto";
import { UpdateAlbumDTO } from "../../model/dto/request/update-album-dto";
import Album from "../../model/entity/Album";
import { AlbumRepository } from "../AlbumRepository";

class AlbumRepositoryImpl implements AlbumRepository {

  updateAlbum = async (request: UpdateAlbumDTO): Promise<Album | null> => {
    const execution = await Album.findOne({
      where: {
        id: request.album_id,
        is_deleted: 0
      }
    }).then(resultSet => {
      return resultSet;
    });

    if(execution === null){
      throw new AlbumNotFoundException();
    }

    execution.title = request.title;

    await execution.save();
    return execution;
  }

  findAlbumById = async(id: number): Promise<Album | null> =>
    Album.findOne({
      where: {
        is_deleted: 0,
        id: id
      }
    }).then(resultSet => resultSet);

  findAlbumByTitle = async(title: string): Promise<Album | null> =>
    Album.findOne({
      where: {
        is_deleted: 0,
        title: title
      }
    }).then(resultSet => resultSet);

  getAllAlbumByMusician = async(musician_id: number): Promise<Array<Album>> => 
    Album.findAll({
        where: {
            is_deleted: 0,
            musician_id: musician_id
        }});

  getAllAlbumsByMusician = async(musician_id: number, dto: PaginationRequestDto): Promise<AsyncManualPagination<Album>> => {
    return (new AsyncManualPagination<Album>().getInstance(
      await Album.findAll({
        where: {
          is_deleted: 0,
          musician_id: musician_id
        },
        offset: (dto.page ?? 1) * 12,
        limit: dto.perPage ?? 12,
      }),
      dto.link,
      dto.page!,
      dto.perPage!
    ))
  }

  createAlbum = async (request: CreateAlbumDTO): Promise<Album> => {
    return Album.create({
      musician_id: request.musician_id,
      title: request.title
    });
  }

  deleteAlbum = async(id: number): Promise<null> => {
    await Album.update({
      is_deleted: 1,
    }, {
      where: {
        id: id,
        is_deleted: 0
      }
    }).then(resultSet => resultSet);

    return null;
  }
    
}

export default new AlbumRepositoryImpl();