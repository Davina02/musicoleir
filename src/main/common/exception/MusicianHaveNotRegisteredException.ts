import { ErrorHandler } from '../../config/Exception';

export class MusicianHaveNotRegisteredException extends ErrorHandler {

  constructor(){
    super(
        "ERROR",
        "Musician have not registered on our system."
    );
  }

}