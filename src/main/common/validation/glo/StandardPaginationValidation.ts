import {query} from "express-validator";

export default [
  query('page')
    .optional({
      nullable: true
    })
    .isNumeric().withMessage('Parameter \'page\' harus dalam angka.')
    .toInt()
  ,

  query('search')
    .optional({
      nullable: true
    })
    .toLowerCase()
  ,
];