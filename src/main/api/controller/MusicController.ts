import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';
import StandardPaginationValidation from '../../common/validation/glo/StandardPaginationValidation';
import { validationResult } from 'express-validator';
import RequestValidationException from '../../common/exception/RequestValidationException';
import CreateMusicValidation from '../../common/validation/cms/mma/CreateMusicValidation';
import UpdateMusicValidation from '../../common/validation/cms/mma/UpdateMusicValidation';
import IdValidation from '../../common/validation/cms/IdValidation';
import { MusicControllerHandler } from '../../handler/MusicControllerHandler';

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
    app.get("/music/:album_id", StandardPaginationValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        return BaseResponse.ok(
            await (new MusicControllerHandler().getAllMusics(
                request.query.page,
                12,
                request.protocol + "://" + request.get('host') + request.baseUrl + request.path,
                parseInt(request.params.album_id!)
            )),
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
    app.post("/music/create", CreateMusicValidation, async (request: Request, response: Response) => {
        /**
         * Request Validator
         */
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new RequestValidationException(
                errors.array()
            );
        }

        return BaseResponse.ok(
            await (new MusicControllerHandler().createMusic(
                request.body.album_id,
                request.body.title,
                request.body.duration
            )),
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
    app.put("/music/update", UpdateMusicValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        return BaseResponse.ok(
            await (new MusicControllerHandler().updateMusic(
                request.body.id,
                request.body.album_id,
                request.body.title,
                request.body.duration
            )),
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

        await new MusicControllerHandler().deleteMusic(request.body.id);

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
