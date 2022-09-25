/**
 * Guard the resources. Except:
 */
 export default [
    /**
     * Root
     */
    '/',
    '/api',
    '/api/storage',
  
    /**
     * Auth
     */
    '/api/auth/login',
    '/api/auth/change-password',

    /**
     * For Testing
     */
    // '/api/user/create',
    // '/api/user/update',
    // '/api/user/delete',
    // '/api/user/all',
    // '/api/user',

    // '/api/musician/create',
    // '/api/musician/update',
    // '/api/musician/delete',
    // '/api/musician/all',

    // '/api/album/create',
    // '/api/album/update',
    // '/api/album/delete',
    // '/api/album/:musician_id',

    // '/api/music/create',
    // '/api/music/update',
    // '/api/music/delete',
    // '/api/music/:album_id',

  ];