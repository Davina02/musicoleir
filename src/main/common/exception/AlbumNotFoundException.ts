import { ErrorHandler } from '../../config/Exception';

export class AlbumNotFoundException extends ErrorHandler {

  constructor(){
    super(
        "409",
        "Album with requested id not found"
    );
  }

}