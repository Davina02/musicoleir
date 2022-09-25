import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';
import StandardPaginationValidation from '../../common/validation/glo/StandardPaginationValidation';
import { validationResult } from 'express-validator';
import RequestValidationException from '../../common/exception/RequestValidationException';
import CreateAlbumValidation from '../../common/validation/cms/ama/CreateAlbumValidation';
import UpdateAlbumValidation from '../../common/validation/cms/ama/UpdateAlbumValidation';
import IdValidation from '../../common/validation/cms/IdValidation';
import { AlbumControllerHandler } from '../../handler/AlbumControllerHandler';

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
    app.get("/album/:musician_id", StandardPaginationValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        return BaseResponse.ok(
            await (new AlbumControllerHandler().getAllAlbums(
                request.query.page,
                12,
                request.protocol + "://" + request.get('host') + request.baseUrl + request.path,
                parseInt(request.params.musician_id!)
            )),
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
    app.post("/album/create", CreateAlbumValidation, async (request: Request, response: Response) => {
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
            await (new AlbumControllerHandler().createAlbum(
                request.body.musician_id,
                request.body.title
            )),
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
    app.put("/album/update", UpdateAlbumValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        return BaseResponse.ok(
            await (new AlbumControllerHandler().updateAlbum(
                request.body.id,
                request.body.title
            )),
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
    app.delete("/album/delete", IdValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        await new AlbumControllerHandler().deleteAlbum(request.body.id);

        return BaseResponse.ok(
            null,
            "Deleted",
            response
        );
    });

    return app;
  }

}

export default new AlbumController().routes();
