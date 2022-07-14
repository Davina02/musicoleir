import { ErrorHandler } from '../../config/Exception';

export class TitleAlreadyExistsException extends ErrorHandler {

  constructor(){
    super(
        "UMA0003",
        "Title tidak valid."
    );
  }

}