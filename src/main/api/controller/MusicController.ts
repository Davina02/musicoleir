import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';
import { PaginationRequestDto } from '../../model/dto/request/pagination-request-dto';
import { ManualPagination } from '../../common/facade/ManualPagination';
import StandardPaginationValidation from '../../common/validation/glo/StandardPaginationValidation';
import MusicRepositoryImpl from '../../repository/impl/MusicRepositoryImpl';
import { validationResult } from 'express-validator';
import RequestValidationException from '../../common/exception/RequestValidationException';
import CreateMusicValidation from '../../common/validation/cms/mma/CreateMusicValidation';
import AlbumRepositoryImpl from '../../repository/impl/AlbumRepositoryImpl';
import { AlbumHaveNotRegisteredException } from '../../common/exception/AlbumHaveNotRegisteredException';
import { TitleAlreadyExistsException } from '../../common/exception/TitleAlreadyExistsException';
import Music from '../../model/entity/Music';
import UpdateMusicValidation from '../../common/validation/cms/mma/UpdateMusicValidation';
import { MusicNotFoundException } from '../../common/exception/MusicNotFoundException';
import IdValidation from '../../common/validation/cms/IdValidation';

const app = express.Router();

class AlbumController extends Controller {

  public routes = (): express.Router => {

    /**
     * Get all musics by album
     * 
     * This API will show all of musics by an album.
     * 
     * Paginate this data by 12.
     * 
     */
    app.get("/:album_id/get-all-musics", StandardPaginationValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        const dto: PaginationRequestDto = ManualPagination.generatePaginationRequest(
            request.query.page,
            12,
            request.protocol + "://" + request.get('host') + request.baseUrl + request.path
        )

        const resultSet = await MusicRepositoryImpl.getAllMusicsByAlbum(
            parseInt(request.params.album_id!),
            dto
        );

        return BaseResponse.ok(
            resultSet,
            "Success",
            response
        );

    });

    /**
     * Create music
     * 
     * This API will create music by giving album's data, music's title and duration.
     * 
     */
    app.post("/create-music", CreateMusicValidation, async (request: Request, response: Response) => {
        /**
         * Request Validator
         */
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new RequestValidationException(
                errors.array()
            );
        }

        const dto = {
            album_id: request.body.album_id,
            title: request.body.title,
            duration: request.body.duration
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

        return BaseResponse.ok(
            music,
            "Success",
            response
        );

    });

    /**
     * Update music
     * 
     * This API will update the chosen music's title, album information, and the duration.
     * 
     */
    app.put("/update-music", UpdateMusicValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        const dto = {
            music_id: request.body.id,
            album_id: request.body.album_id,
            title: request.body.title,
            duration: request.body.duration
        }

        return BaseResponse.ok(
            await MusicRepositoryImpl.updateMusic(dto),
            "Success",
            response
        );
    });

    /**
     * Delete music
     * 
     * This API will delete the chosen music's data.
     * 
     */
    app.delete("/delete-music", IdValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        const id: number = request.body.id;
        const resultSet = await MusicRepositoryImpl.findMusicById(id);

        if (resultSet == null) {
            throw new MusicNotFoundException();
        }

        await MusicRepositoryImpl.deleteMusic(id);

        return BaseResponse.ok(
            null,
            "Success",
            response
        );
    });

    return app;
  }

}

export default new AlbumController().routes();
