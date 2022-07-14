import {body} from "express-validator";

/**
 * Expected Request Body
 * {
 *   "id": 1,
 *   "name": "musician name",
 * }
 */
export default [
    body('id')
      .exists().withMessage('Parameter \'id\' tidak ditemukan.')
    ,

    body('name')
      .exists().withMessage('Parameter \'name\' tidak ditemukan.')
      .not().isEmpty().withMessage('Parameter \'name\' tidak boleh berisi string kosong.')
    

]