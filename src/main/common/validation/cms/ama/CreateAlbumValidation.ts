import {body} from "express-validator";

/**
 * Expected Request Body
 * {
 *   "musician_id": 1,
 *   "title": "Title"
 * }
 */
export default [
    body('musician_id')
      .exists().withMessage('Parameter \'musician_id\' tidak ditemukan.')
      .isNumeric().withMessage('Parameter \'musician_id\' harus diisi dalam bentuk angka')
    ,
    
    body('title')
      .exists().withMessage('Parameter \'title\' tidak ditemukan.')
      .not().isEmpty().withMessage('Parameter \'title\' tidak boleh berisi string kosong.')

]