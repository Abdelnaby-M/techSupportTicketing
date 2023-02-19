import config from '../config';
import jwt, { Secret, TokenExpiredError } from 'jsonwebtoken';

export interface ITokenVerifyResult {
    decodedToken?: {
        sub?: string,
        iat?: string,
        type?: string,
    };
    valid: boolean;
    expired: boolean;
}

export default class JwtHelper {

    // expiresIn is in seconds
    public static sign(payload: object, expiresIn: number): string {

        return jwt.sign(
            payload,
            config.jwt.privateKey as Secret,
            {
                algorithm: 'RS256',
                expiresIn
            }
        )
    }

    public static async verify(token: string): Promise<ITokenVerifyResult> {
        
        var valid = true;
        var expired = false;
        var decodedToken;

        try {
            // verify always returns "object" because we always use a "payload" as object (not string) in signing
            decodedToken =  jwt.verify(token, config.jwt.publicKey as Secret) as object;
        } catch(e) {

            if (e instanceof TokenExpiredError) {
                expired = true;
            } else {
                valid = false;
            }
        }

        return {
            decodedToken: decodedToken,
            expired: expired,
            valid: valid
        };
    }

    public static decode(token: string): any {
        return jwt.decode(token);
    }
}