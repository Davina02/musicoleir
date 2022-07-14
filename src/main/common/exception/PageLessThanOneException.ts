import { ErrorHandler } from "../../config/Exception"; 

export default class PageLessThanOneException extends ErrorHandler {

  constructor() {
    super(
      "GLO0002",
      `Parameter 'page' dan 'per_page' harus diisi lebih dari 1.`
    );
  }
}