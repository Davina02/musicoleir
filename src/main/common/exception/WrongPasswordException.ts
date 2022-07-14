import { ErrorHandler } from "../../config/Exception";

export class WrongCredentialException extends ErrorHandler {

  constructor() {
    super(
      "401",
      "Email atau kata sandi yang dimasukan tidak valid. Silahkan coba kembali."
    );
  }

}
