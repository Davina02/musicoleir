import { ErrorHandler } from '../../config/Exception';

export class MusicianNotFoundException extends ErrorHandler {

  constructor(){
    super(
        "409",
        "Musician with requested id not found"
    );
  }

}