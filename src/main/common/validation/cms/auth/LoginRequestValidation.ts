import { body } from "express-validator";

/**
 * @RequestBody
 * Expected Request Body
 * 
 * {
 *   "username": "davina",
 *   "password": "somestring"
 * }
 */
 export default [
  body('username')
    .exists().withMessage('Parameter \'username\' tidak ditemukan.')
  ,
  body('password')
    .exists().withMessage('Parameter \'password\' tidak ditemukan')
];