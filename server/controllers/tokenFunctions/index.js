require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    // TODO: Access token으로 sign합니다.
    // HINT: 토큰을 리턴하세요. (공식 문서의 Synchronous한 방법을 사용합니다)
    const accessToken = sign(data, process.env.ACCESS_SECRET,{expiresIn : "1d"});
    return accessToken
  },
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "3d" });
  },
  sendAccessToken: (res, accessToken) => {
    // TODO: JWT 토큰을 쿠키로 전달합니다.
    return res.cookie("jwt", accessToken);
    //res.json({ message: 'ok' });
  },
  sendRefreshToken: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
  },
  resendAccessToken: (res, accessToken, data) => {
    res.cookie("jwt",accessToken).json({ data: { userInfo: data }, message: "ok" });
  },
  isAuthorized: (req) => {
    // TODO: JWT 토큰 정보를 받아서 검증합니다.
    // HINT: jsonwebtoken 라이브러리의 verify 함수를 사용하여 decode된 payload를 리턴하세요. (공식 문서의 Synchronous한 방법을 사용합니다)
   // console.log("###############################",req.cookies)
// const decode = verify(sdflsdjflksdjfls)
// return decode ;
    try{
      if(!req.cookies.jwt){
        return null;
      } else {
     const  havingtokken =  req.cookies.jwt
        let a =verify(havingtokken, process.env.ACCESS_SECRET);
        return a;

      }

    }catch(err){

      return null;


    }

  },
  checkRefeshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      // return null if refresh token is not valid
      return null;
    }
  },
};
