import { AlbumNotFoundException } from "../common/exception/AlbumNotFoundException";
import { MusicianHaveNotRegisteredException } from "../common/exception/MusicianHaveNotRegisteredException";
import { TitleAlreadyExistsException } from "../common/exception/TitleAlreadyExistsException";
import { ManualPagination } from "../common/facade/ManualPagination";
import { PaginationRequestDto } from "../model/dto/request/pagination-request-dto";
import AlbumRepositoryImpl from "../repository/impl/AlbumRepositoryImpl";
import MusicianRepositoryImpl from "../repository/impl/MusicianRepositoryImpl";

export class AlbumControllerHandler {

    public async getAllAlbums (page: any, perPage: any, link: string, musician_id: number) {

        const dto: PaginationRequestDto = ManualPagination.generatePaginationRequest(
            page,
            perPage,
            link
        )

        await AlbumRepositoryImpl.getAllAlbumsByMusician(
            musician_id,
            dto
        );

    }

    public async createAlbum (musician_id: number, title: string) {
        const dto = {
            musician_id: musician_id,
            title: title
        }

        /**
         * Check if musician's data have not registered
         */
        if (await MusicianRepositoryImpl.findMusicianById(dto.musician_id) == null) {
            throw new MusicianHaveNotRegisteredException();
        }

        /**
         * Check if title is already occupied
         */
        if (await AlbumRepositoryImpl.findAlbumByTitle(dto.title) != null) {
            throw new TitleAlreadyExistsException();
        }

        /**
         * Create album
         */
        await AlbumRepositoryImpl.createAlbum(dto);
    }

    public async updateAlbum(album_id: number, title: string) {
        const dto = {
            album_id: album_id,
            title: title
        }

        await AlbumRepositoryImpl.updateAlbum(dto)
    }

    public async deleteAlbum(album_id: number) {
        const resultSet = await AlbumRepositoryImpl.findAlbumById(album_id);

        if (resultSet == null) {
            throw new AlbumNotFoundException();
        }

        await AlbumRepositoryImpl.deleteAlbum(album_id);
    }

}