import { body } from "express-validator";

/**
 * Expected Request Body
 * {
 *   "code": "generated_code".
 *   "password": "somePasswordStringWithMinimalLengthOf8"
 * }
 */
export default [
  body('password')
    .exists().withMessage('Parameter \'password\' tidak ditemukan.')
    .isLength({ min: 8 }).withMessage('Minimal panjang password adalah 8.')
];