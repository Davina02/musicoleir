import { AlbumNotFoundException } from "../../common/exception/AlbumNotFoundException";
import { MusicNotFoundException } from "../../common/exception/MusicNotFoundException";
import { AsyncManualPagination } from "../../common/facade/ManualPagination";
import { CreateMusicDTO } from "../../model/dto/request/create-music-dto";
import { PaginationRequestDto } from "../../model/dto/request/pagination-request-dto";
import { UpdateMusicDTO } from "../../model/dto/request/update-music-dto";
import Music from "../../model/entity/Music";
import { MusicRepository } from "../MusicRepository";

class MusicRepositoryImpl implements MusicRepository {

  updateMusic = async (request: UpdateMusicDTO): Promise<Music | null> => {
    const execution = await Music.findOne({
      where: {
        id: request.music_id,
        is_deleted: 0
      }
    }).then(resultSet => {
      return resultSet;
    });

    if(execution === null){
      throw new MusicNotFoundException();
    }

    execution.album_id = request.album_id;
    execution.title = request.title;
    execution.duration = request.duration;

    await execution.save();
    return execution;
  }

  findMusicById = async(id: number): Promise<Music> =>
    Music.findOne({
      where: {
        is_deleted: 0,
        id: id
      }
    }).then(resultSet => {
      if(resultSet === null) throw new MusicNotFoundException();

      return resultSet;
    });

  findMusicByTitle = async(title: string): Promise<Music> =>
    Music.findOne({
      where: {
        is_deleted: 0,
        title: title
      }
    }).then(resultSet => {
      if(resultSet === null) throw new MusicNotFoundException();

      return resultSet;
    });

  getAllMusicByAlbum = async(album_id: number): Promise<Array<Music>> => 
    Music.findAll({
        where: {
            is_deleted: 0,
            album_id: album_id
        }});

  getAllMusicsByAlbum = async(album_id: number, dto: PaginationRequestDto): Promise<AsyncManualPagination<Music>> => {
    return (new AsyncManualPagination<Music>().getInstance(
      await Music.findAll({
        where: {
          is_deleted: 0,
          album_id: album_id
        },
        offset: (dto.page ?? 1) * 12,
        limit: dto.perPage ?? 12,
      }),
      dto.link,
      dto.page!,
      dto.perPage!
    ))
  }

  createMusic = async (request: CreateMusicDTO): Promise<Music> => {
    return Music.create({
      album_id: request.album_id,
      title: request.title,
      duration: request.duration
    });
  }

  deleteMusic = async(id: number): Promise<null> => {
    await Music.update({
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

export default new MusicRepositoryImpl();