import dotenv from 'dotenv';
dotenv.config();

import { Dialect } from 'sequelize';

export default {
  /*
  |--------------------------------------------------------------------------
  | Server Identification
  |--------------------------------------------------------------------------
  |
  | Here is where you register the server identification. 
  | This value is used when the framework needs to place application's name.
  | 
  */
  server: {
    hostname  : process.env.SERVER_HOSTNAME ?? 'localhost',
    port      : process.env.SERVER_PORT ?? 57898,
    app       : process.env.APP_NAME ?? 'Musicoleir API',
    env       : process.env.APP_ENV ?? 'production'
  },

  /*
  |--------------------------------------------------------------------------
  | Default Database Connection Configuration
  |--------------------------------------------------------------------------
  |
  | Here you may specify which of the database connections below you wish
  | to use as your default connection for all database work. Of course
  | you may use many connections at once using the Database library.
  |
  */
  database: {

    main: {
      dialect   : (process.env.DB_CONNECTION_DIALECT ?? "mysql") as Dialect,
      uri       : process.env.DB_HOSTNAME ?? "127.0.0.1",
      port      : parseInt(process.env.DB_PORT ?? "3306"),
      database  : process.env.DB_DATABASE ?? '',
      username  : process.env.DB_USERNAME ?? 'root',
      password  : process.env.DB_PASSWORD ?? ''
    }

  },

  /*
  |--------------------------------------------------------------------------
  | Authorization Secret Key Configuration
  |--------------------------------------------------------------------------
  |
  | Here you may specify and configure Authorization Secret Key.
  | In this case below, is using JWT.
  |
  */
  jwt: {
    secret_key  : process.env.JWT_SECRET ?? "jwtsecret"

  },
  
}
