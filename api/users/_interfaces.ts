import { NowRequest } from "@now/node";

export interface NowAuth0Request extends NowRequest {
  user?: {
    iss: string; // 'https://refugiar.auth0.com/',
    sub: string; // 'auth0|:user_id',
    aud: [string]; // [ 'https://refugiar-api.now.sh', 'https://refugiar.auth0.com/userinfo' ]
    iat: number;
    exp: number;
    azp: string;
    scope: string; // "openid profile email";
  };
}
