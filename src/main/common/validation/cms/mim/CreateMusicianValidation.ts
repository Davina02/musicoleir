import {body} from "express-validator";

/**
 * Expected Request Body
 * {
 *   "name": "Musician Name",
 * }
 */
export default [
    body('name')
      .exists().withMessage('Parameter \'name\' tidak ditemukan.')
      .not().isEmpty().withMessage('Parameter \'name\' tidak boleh berisi string kosong.')

]