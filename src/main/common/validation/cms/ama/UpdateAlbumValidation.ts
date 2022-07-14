import {body} from "express-validator";

/**
 * Expected Request Body
 * {
 *   "id": 1,
 *   "musician_id": 1,
 *   "title": "Title"
 * }
 */
export default [
    body('id')
        .exists().withMessage('Parameter \'id\' tidak ditemukan.')
    ,
    
    body('musician_id')
      .exists().withMessage('Parameter \'musician_id\' tidak ditemukan.')
      .isNumeric().withMessage('Parameter \'musician_id\' harus diisi dalam bentuk angka')
    ,
    
    body('title')
      .exists().withMessage('Parameter \'title\' tidak ditemukan.')

]