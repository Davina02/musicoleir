import { BaseResponse } from '../model/dto/BaseResponse';
import express from 'express';
const route = express.Router();

/*
|--------------------------------------------------------------------------
| Import Controllers
|--------------------------------------------------------------------------
|
| Here is where you can register controller that you've already exported
| in ./api/controller/controller-file
| Do as you like, but for me it's easier to format the imported variable 
| with PascalCase.
|
*/

import ExampleController from '../api/controller/ExampleController';
import MusicianController from '../api/controller/MusicianController';
import MusicController from '../api/controller/MusicController';
import UserController from '../api/controller/UserController';
import AlbumController from '../api/controller/AlbumController';
import AuthController from '../api/controller/AuthController';

route.use(ExampleController);
route.use(AuthController);
route.use(UserController);
route.use(MusicianController);
route.use(AlbumController);
route.use(MusicController);

/**
 * API root point. Just to make sure the API is okay.
 */
 import config from '../config/Config';
 
 route.get('/', (req, res) => {
   const date = new Date();  
   
   const data = {
     "app": config.server.hostname,
     "app_time_zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
     "time": date.toLocaleString()
   };
 
   return BaseResponse.ok(
     data,
     config.server.app,
     res
   );
 });
 

/**
 * Always put this on the bottom of routes file
 */
export default route;
