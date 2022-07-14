import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';
import { PaginationRequestDto } from '../../model/dto/request/pagination-request-dto';
import { ManualPagination } from '../../common/facade/ManualPagination';
import StandardPaginationValidation from '../../common/validation/glo/StandardPaginationValidation';
import MusicianRepositoryImpl from '../../repository/impl/MusicianRepositoryImpl';
import { validationResult } from 'express-validator';
import RequestValidationException from '../../common/exception/RequestValidationException';
import CreateMusicianValidation from '../../common/validation/cms/mim/CreateMusicianValidation';
import { NameAlreadyExistsException } from '../../common/exception/NameAlreadyExistsException';
import Musician from '../../model/entity/Musician';
import UpdateMusicianValidation from '../../common/validation/cms/mim/UpdateMusicianValidation';
import { MusicianNotFoundException } from '../../common/exception/MusicianNotFoundException';
import IdValidation from '../../common/validation/cms/IdValidation';

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
    app.get("/get-all-musicians", StandardPaginationValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        const dto: PaginationRequestDto = ManualPagination.generatePaginationRequest(
            request.query.page,
            12,
            request.protocol + "://" + request.get('host') + request.baseUrl + request.path
        )

        const resultSet = await MusicianRepositoryImpl.getAllMusicians(dto);

        return BaseResponse.ok(
            resultSet,
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
    app.post("/create-musician", CreateMusicianValidation, async (request: Request, response: Response) => {
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
            name: request.body.name
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

        return BaseResponse.ok(
            musician,
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
    app.put("/update-musician", UpdateMusicianValidation, async (request: Request, response: Response) => {
        super.requestValidator(request);

        const dto = {
            musician_id: request.body.id,
            name: request.body.name
        }

        return BaseResponse.ok(
            await MusicianRepositoryImpl.updateMusician(dto),
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

        const id: number = request.body.id;
        const resultSet = await MusicianRepositoryImpl.findMusicianById(id);

        if (resultSet == null) {
            throw new MusicianNotFoundException
        }

        await MusicianRepositoryImpl.deleteMusician(id);

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
