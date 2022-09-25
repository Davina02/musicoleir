import { MusicianNotFoundException } from "../common/exception/MusicianNotFoundException";
import { NameAlreadyExistsException } from "../common/exception/NameAlreadyExistsException";
import { AsyncManualPagination, ManualPagination } from "../common/facade/ManualPagination";
import { PaginationRequestDto } from "../model/dto/request/pagination-request-dto";
import Musician from "../model/entity/Musician";
import MusicianRepositoryImpl from "../repository/impl/MusicianRepositoryImpl";

export class MusicianControllerHandler {

    public async getAllMusicians(page: any, perPage: any, link: string): Promise<AsyncManualPagination<Musician>> {

        const dto: PaginationRequestDto = ManualPagination.generatePaginationRequest(
            page,
            perPage,
            link
        )

        const result = await MusicianRepositoryImpl.getAllMusicians(dto);

        return result;
    }

    public async createMusician(name: string): Promise<Musician> {
        const dto = {
            name: name
        }

        /**
         * Check if name is already occupied
         */
        if (await MusicianRepositoryImpl.findMusicianByName(dto.name) != null) {
            throw new NameAlreadyExistsException();
        }

        /**
         * Create musician
         */
        const musician: Musician = await MusicianRepositoryImpl.createMusician(dto);

        return musician;
    }

    public async updateMusician(musician_id: number, name: string): Promise<Musician> {
        const dto = {
            musician_id: musician_id,
            name: name
        }

        /**
         * Check if name is already occupied
         */
        if (await MusicianRepositoryImpl.findMusicianByName(dto.name) != null) {
            throw new NameAlreadyExistsException();
        }

        const musician: Musician | null = await MusicianRepositoryImpl.updateMusician(dto)

        return musician!;
    }

    public async deleteMusician(musician_id: number) {
        const resultSet = await MusicianRepositoryImpl.findMusicianById(musician_id);

        if (resultSet == null) {
            throw new MusicianNotFoundException
        }

        await MusicianRepositoryImpl.deleteMusician(musician_id);
    }

}