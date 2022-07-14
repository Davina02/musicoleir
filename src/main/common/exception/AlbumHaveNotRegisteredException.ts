import { ErrorHandler } from '../../config/Exception';

export class AlbumHaveNotRegisteredException extends ErrorHandler {

  constructor(){
    super(
        "ERROR",
        "Album have not registered on our system."
    );
  }

}