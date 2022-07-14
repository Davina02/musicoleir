import { ErrorHandler } from '../../config/Exception';

export class NameAlreadyExistsException extends ErrorHandler {

  constructor(){
    super(
        "UMA0003",
        "Name tidak valid."
    );
  }

}