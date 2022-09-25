import {body} from "express-validator";

/**
 * Expected Request Body
 * {
 *   "album_id": 1,
 *   "title": "Title",
 *   "duration": "04:34"
 * }
 */
export default [
    body('album_id')
      .exists().withMessage('Parameter \'album_id\' tidak ditemukan.')
      .isNumeric().withMessage('Parameter \'album_id\' harus diisi dalam bentuk angka')
    ,
    
    body('title')
      .exists().withMessage('Parameter \'title\' tidak ditemukan.')
      .not().isEmpty().withMessage('Parameter \'title\' tidak boleh berisi string kosong.')
    ,

    body('duration')
    .exists().withMessage('Parameter \'duration\' tidak ditemukan.')


]