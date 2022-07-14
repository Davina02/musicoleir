import { body } from "express-validator";

/**
 * Expected Request Body
 * {
 *   "id": 1
 * }
 */
export default [
  body('id')
    .exists().withMessage('Parameter \'id\' tidak ditemukan.')
    .isNumeric().withMessage('Parameter \'id\' harus diisi dalam bentuk angka')
];