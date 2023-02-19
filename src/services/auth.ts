import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';
import { env } from 'process';
import JwtHelper from '../utils/JwtHelper';

export function issueJWT(uid: string, expiration: string, userType: string) {

  const payload = {
    sub: uid,
    type: userType,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, env.PRIV_KEY as string, { expiresIn: expiration, algorithm: 'RS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiration
  }
}

export class auth {

    static async login(data: any,) {
      
      const { email, password } = data;
  
      const user = await userModel.findOne({ email }).select(
        "password uid"
      );
      if (!user) return ({message: "User not found" });
  
      if (password === user.password) {
        const id = user.uid
        const now = Date.now();
        const token = JwtHelper.sign({sub: id, iat: now, type: 'user'}, 1)
        return { token };
      } else {
        return ({message: "Invalid Password" });
      }
    }
  
    static async changePassword(data: any) {
  
      const { uid, token, oldPassword, newPassword } = data;
    //   const decode = jwt.verify(token, env.PUB_KEY);
      const user = await userModel.findOne({ uid: uid }).select("+password");
  
      if (!user) return ({message: "User not found" });
  
      if(oldPassword === user.password) var validPassword = true;
      else var validPassword = false;
  
      if (validPassword) {
  
        // const salt = await bcrypt.genSalt(10);
        user.password = newPassword;
        await user.save();
        return { success: true, data: "Password Changed" };
      } else {
        return ({message: "Invalid Password" });
      }
    }
  
    static async sendResetLink(email: string){

    //   const { email } = data;
      const user = await userModel.findOne({ email });
      if (!user) {
        return {message: "User not found"};
      }
      var tokenParts = issueJWT(user.uid, "1800", 'user');
      var signedToken = tokenParts.token.split(" ")
      var url = env.BASE_URL + '/' + signedToken[1];
      // const salt = await bcrypt.genSalt(10);
      // const password = generatePassword(8);
      // const newPassword = await bcrypt.hash(password, 10);
      // user.password = newPassword;
      await user.save();
  
      const message = `
      <h1>Your reset password link is vaild for only 30 min from ${Date.now}</h1>
      <h2>${url} </h2>
      `;
  
      try {
        // sendEmail({
        //   to: user.email,
        //   sub: "Password Has Been Reset",
        //   text: message,
        // });
        return { success: true, data: "E-mail Has Been Reset" };
      } catch (error) {
        return {message:"error"};
      }
    }

    static async resetPassword(data: any){

        const {token, newPassword} = data;
        var payload = await JwtHelper.verify(token) ;

        if( payload.decodedToken ){
            
            var uid = payload.decodedToken.sub;
            const user = await userModel.findOne({ uid });

            if(user){
                user.password = newPassword;
                await user.save();
                return { success: true, data: "Password Changed" };
            } else  return ({message: "User not found" });
        
        } else return ({message: "verification faild" });

    }
}