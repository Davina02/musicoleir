import { Request, Response, NextFunction } from 'express';
import { AuthorizationToken } from '../../common/facade/AuthorizationToken';
import { BaseResponse } from '../../model/dto/BaseResponse';
import UnguardedResources from './UnguardedResources';

/**
 * authentication.ts
 *  This middleware contains authentication settings.
 */

export default async (req: Request, res: Response, next: NextFunction) => {

  const pathCheck: string = req.baseUrl + req.path;

  if(UnguardedResources.includes(pathCheck)){

    /**
     * If the uri is registered in exception,
     * proceed to the resource.
     */

    next();


  }else{

    /**
     * In case the resource is protected
     */

    /**
     * check if Authorization header exists
     */
    const token: string | undefined = req.headers.authorization;

    if(typeof token === 'undefined'){
      return BaseResponse.error(
                "Autentikasi diperlukan untuk mengakses data ini.",
                res,
                "403"
            );
    }

    /**
     * If the uri is registered in exception,
     * check authorization validity.
     */
    const eligible: boolean = await new AuthorizationToken().validateToken(token);
    if(!eligible){
      return BaseResponse.error(
                "Token tidak valid.",
                res,
                "403"
            );
    }

    next();
  }


}