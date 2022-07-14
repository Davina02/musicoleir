import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';
import { PaginationRequestDto } from '../../model/dto/request/pagination-request-dto';
import { ManualPagination } from '../../common/facade/ManualPagination';
import StandardPaginationValidation from '../../common/validation/glo/StandardPaginationValidation';
import AlbumRepositoryImpl from '../../repository/impl/AlbumRepositoryImpl';
import { validationResult } from 'express-validator';
import RequestValidationException from '../../common/exception/RequestValidationException';
import MusicianRepositoryImpl from '../../repository/impl/MusicianRepositoryImpl';
import Album from '../../model/entity/Album';
import CreateAlbumValidation from '../../common/validation/cms/ama/CreateAlbumValidation';
import { MusicianHaveNotRegisteredException } from '../../common/exception/MusicianHaveNotRegisteredException';
import { TitleAlreadyExistsException } from '../../common/exception/TitleAlreadyExistsException';
import UpdateAlbumValidation from '../../common/validation/cms/ama/UpdateAlbumValidation';
import { AlbumNotFoundException } from '../../common/exception/AlbumNotFoundException';
import IdValidation from '../../common/validation/cms/IdValidation';

const app = express.Router();

class AlbumController extends Controller {

  public routes = (): express.Router => {

    /**
     * Get all albums by musician
     * 
     * This API will show all of albums by a musician.
     * 
     * Paginate this data by 12.
     * 
     */
    app.get("/:musician_id/get-all-albums", StandardPaginationValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        const dto: PaginationRequestDto = ManualPagination.generatePaginationRequest(
            request.query.page,
            12,
            request.protocol + "://" + request.get('host') + request.baseUrl + request.path
        )

        const resultSet = await AlbumRepositoryImpl.getAllAlbumsByMusician(
            parseInt(request.params.musician_id!),
            dto
        );

        return BaseResponse.ok(
            resultSet,
            "Success",
            response
        );

    });

    /**
     * Create album
     * 
     * This API will create album by giving musician's data and album's title.
     * 
     */
    app.post("/create-album", CreateAlbumValidation, async (request: Request, response: Response) => {
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
            musician_id: request.body.musician_id,
            title: request.body.title
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
        const album: Album = await AlbumRepositoryImpl.createAlbum(dto);

        return BaseResponse.ok(
            album,
            "Success",
            response
        );

    });

    /**
     * Update album
     * 
     * This API will update the chosen album's title.
     * 
     */
    app.put("/update-album", UpdateAlbumValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        const dto = {
            album_id: request.body.id,
            title: request.body.title
        }

        return BaseResponse.ok(
            await AlbumRepositoryImpl.updateAlbum(dto),
            "Success",
            response
        );
    });

    /**
     * Delete album
     * 
     * This API will delete the chosen album's data.
     * 
     */
    app.delete("/delete-album", IdValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        const id: number = request.body.id;
        const resultSet = await AlbumRepositoryImpl.findAlbumById(id);

        if (resultSet == null) {
            throw new AlbumNotFoundException();
        }

        await AlbumRepositoryImpl.deleteAlbum(id);

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
