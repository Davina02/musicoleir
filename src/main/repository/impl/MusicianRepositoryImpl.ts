import { MusicianNotFoundException } from "../../common/exception/MusicianNotFoundException";
import { AsyncManualPagination } from "../../common/facade/ManualPagination";
import { CreateMusicianDTO } from "../../model/dto/request/create-musician-dto";
import { PaginationRequestDto } from "../../model/dto/request/pagination-request-dto";
import { UpdateMusicianDTO } from "../../model/dto/request/update-musician-dto";
import Musician from "../../model/entity/Musician";
import { MusicianRepository } from "../MusicianRepository";

class MusicianRepositoryImpl implements MusicianRepository {

  updateMusician = async (request: UpdateMusicianDTO): Promise<Musician | null> => {
    const execution = await Musician.findOne({
      where: {
        id: request.musician_id,
        is_deleted: 0
      }
    }).then(resultSet => {
      return resultSet;
    });

    if(execution === null){
      throw new MusicianNotFoundException();
    }

    execution.name = request.name;

    await execution.save();
    return execution;
  }

  findMusicianById = async(id: number): Promise<Musician> =>
    Musician.findOne({
      where: {
        is_deleted: 0,
        id: id
      }
    }).then(resultSet => {
      if(resultSet === null) throw new MusicianNotFoundException();

      return resultSet;
    });

  findMusicianByName = async(name: string): Promise<Musician> =>
    Musician.findOne({
      where: {
        is_deleted: 0,
        name: name
      }
    }).then(resultSet => {
      if(resultSet === null) throw new MusicianNotFoundException();

      return resultSet;
    });

  getAllMusician = async(): Promise<Array<Musician>> => Musician.findAll({where: {is_deleted: 0}});

  getAllMusicians = async(dto: PaginationRequestDto): Promise<AsyncManualPagination<Musician>> => {
    return (new AsyncManualPagination<Musician>().getInstance(
      await Musician.findAll({
        where: {
          is_deleted: 0
        },
        offset: (dto.page ?? 1) * 12,
        limit: dto.perPage ?? 12,
      }),
      dto.link,
      dto.page!,
      dto.perPage!
    ))
  }

  createMusician = async (request: CreateMusicianDTO): Promise<Musician> => {
    return Musician.create({
      name: request.name
    });
  }

  deleteMusician = async(id: number): Promise<null> => {
    await Musician.update({
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

export default new MusicianRepositoryImpl();