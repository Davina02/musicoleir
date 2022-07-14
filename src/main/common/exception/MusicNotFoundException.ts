import { ErrorHandler } from '../../config/Exception';

export class MusicNotFoundException extends ErrorHandler {

  constructor(){
    super(
        "409",
        "Music with requested id not found"
    );
  }

}