import {body} from "express-validator";

/**
 * Expected Request Body
 * {
 *   "id": 1,
 *   "username": "Username",
 *   "full_name": "Example Name",
 *   "password": "examplepassw"
 * }
 */
export default [
    body('id')
      .exists().withMessage('Parameter \'id\' tidak ditemukan.')
    ,

    body('full_name')
      .exists().withMessage('Parameter \'full_name\' tidak ditemukan.')
      .not().isEmpty().withMessage('Parameter \'full_name\' tidak boleh berisi string kosong.')

]