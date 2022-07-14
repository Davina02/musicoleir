import {body} from "express-validator";

/**
 * Expected Request Body
 * {
 *   "id": 1,
 *   "album_id": 1,
 *   "title": "Title",
 *   "duration": "04:34"
 * }
 */
export default [
    body('id')
        .exists().withMessage('Parameter \'id\' tidak ditemukan.')
    ,

    body('album_id')
      .exists().withMessage('Parameter \'album_id\' tidak ditemukan.')
      .isNumeric().withMessage('Parameter \'album_id\' harus diisi dalam bentuk angka')
    ,
    
    body('title')
      .exists().withMessage('Parameter \'title\' tidak ditemukan.')
    ,

    body('duration')
    .exists().withMessage('Parameter \'duration\' tidak ditemukan.')


]