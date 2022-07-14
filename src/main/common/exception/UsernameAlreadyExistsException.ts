import { ErrorHandler } from '../../config/Exception';

export class UsernameAlreadyExistsException extends ErrorHandler {

  constructor(){
    super(
        "UMA0003",
        "Username tidak valid."
    );
  }

}
