import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';
import StandardPaginationValidation from '../../common/validation/glo/StandardPaginationValidation';
import { validationResult } from 'express-validator';
import RequestValidationException from '../../common/exception/RequestValidationException';
import CreateMusicianValidation from '../../common/validation/cms/mim/CreateMusicianValidation';
import UpdateMusicianValidation from '../../common/validation/cms/mim/UpdateMusicianValidation';
import IdValidation from '../../common/validation/cms/IdValidation';
import { MusicianControllerHandler } from '../../handler/MusicianControllerHandler';

const app = express.Router();

class MusicianController extends Controller {

  public routes = (): express.Router => {

    /**
     * Get all musicians
     * 
     * This API will show all of musicians.
     * 
     * Paginate this data by 12.
     * 
     */
    app.get("/musician/all", StandardPaginationValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        return BaseResponse.ok(
            await (new MusicianControllerHandler().getAllMusicians(
                request.query.page,
                12,
                request.protocol + "://" + request.get('host') + request.baseUrl + request.path
            )),
            "Success",
            response
        );

    });

    /**
     * Create musician
     * 
     * This API will create musician by giving name.
     * 
     */
    app.post("/musician/create", CreateMusicianValidation, async (request: Request, response: Response) => {
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
            await (new MusicianControllerHandler().createMusician(
                request.body.name
            )),
            "Success",
            response
        );
    });

    /**
     * Update musician
     * 
     * This API will update the chosen musician's name.
     * 
     */
    app.put("/musician/update", UpdateMusicianValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        return BaseResponse.ok(
            await (new MusicianControllerHandler().updateMusician(
                request.body.id,
                request.body.name
            )),
            "Success",
            response
        );
    });

    /**
     * Delete musician
     * 
     * This API will delete the chosen musician's data.
     * 
     */
    app.delete("/delete-musician", IdValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        await new MusicianControllerHandler().deleteMusician(request.body.id);

        return BaseResponse.ok(
            null,
            "Success",
            response
        );
    });

    return app;
  }

}

export default new MusicianController().routes();
