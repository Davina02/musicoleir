import { AlbumHaveNotRegisteredException } from "../common/exception/AlbumHaveNotRegisteredException";
import { MusicNotFoundException } from "../common/exception/MusicNotFoundException";
import { TitleAlreadyExistsException } from "../common/exception/TitleAlreadyExistsException";
import { AsyncManualPagination, ManualPagination } from "../common/facade/ManualPagination";
import { PaginationRequestDto } from "../model/dto/request/pagination-request-dto";
import Music from "../model/entity/Music";
import AlbumRepositoryImpl from "../repository/impl/AlbumRepositoryImpl";
import MusicRepositoryImpl from "../repository/impl/MusicRepositoryImpl";

export class MusicControllerHandler {

    public async getAllMusics(page: any, perPage: any, link: string, album_id: number): Promise<AsyncManualPagination<Music>> {

        const dto: PaginationRequestDto = ManualPagination.generatePaginationRequest(
            page,
            perPage,
            link
        )

        const result = await MusicRepositoryImpl.getAllMusicsByAlbum(
            album_id,
            dto
        );

        return result;
    }

    public async createMusic(album_id: number, title: string, duration: string): Promise<Music> {
        const dto = {
            album_id: album_id,
            title: title,
            duration: duration
        }

        /**
         * Check if album's data have not registered
         */
        if (await AlbumRepositoryImpl.findAlbumById(dto.album_id) == null) {
            throw new AlbumHaveNotRegisteredException();
        }

        /**
         * Check if title is already occupied
         */
        if (await MusicRepositoryImpl.findMusicByTitle(dto.title) != null) {
            throw new TitleAlreadyExistsException();
        }

        /**
         * Create music
         */
        const music: Music = await MusicRepositoryImpl.createMusic(dto);

        return music;
    }

    public async updateMusic(music_id: number, album_id: number, title: string, duration: string): Promise<Music> {
        const dto = {
            music_id: music_id,
            album_id: album_id,
            title: title,
            duration: duration
        }

        /**
         * Check if album's data have not registered
         */
        if (await AlbumRepositoryImpl.findAlbumById(dto.album_id) == null) {
            throw new AlbumHaveNotRegisteredException();
        }

        /**
         * Check if title is already occupied
         */
        if (await MusicRepositoryImpl.findMusicByTitle(dto.title) != null) {
            throw new TitleAlreadyExistsException();
        }

        const music: Music | null = await MusicRepositoryImpl.updateMusic(dto);

        return music!;
    }

    public async deleteMusic(music_id: number) {
        const resultSet = await MusicRepositoryImpl.findMusicById(music_id);

        if (resultSet == null) {
            throw new MusicNotFoundException();
        }

        await MusicRepositoryImpl.deleteMusic(music_id);
    }

}