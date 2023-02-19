import {Request, Response, NextFunction} from 'express';
import JwtHelper from "../utils/JwtHelper";

export default function authorize(allowedTypes: string []) {

  return async function (req: Request, res: Response, next: NextFunction) {

    var token = req.headers.authorization;
    
    if (!token) {
      res.status(401).json({
        success: false,
        message: "TOKEN_NOT_FOUND",
      });
    }
    else if(typeof token == 'string'){

      token = token.split(' ')[1]
      const decoded = await JwtHelper.verify(token);

      if(decoded.expired){

        res.status(401).json({
          success: false,
          message: "TOKEN_Expired",
        });
      }
      if (decoded.decodedToken?.type ){
        if(allowedTypes.includes(decoded.decodedToken.type)){

          req.body.userId = decoded.decodedToken.sub;
          next();
        }
        else {
          res.status(401).json({
            success: false,
            message: "NOT_AUTHORIZED",
          });
        }

      }
    }

    else {
      res.status(401).json({
        success: false,
        message: "USER_NOT_AUTHORIZED",
      });
    }

    
  };
}
