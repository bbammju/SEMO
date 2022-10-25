import React, { useEffect } from "react";
import axios from "axios";
import Main from "./pages/main";
const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token"
const KAKAO_GRANT_TYPE="authorization_code"
const KAKAO_CLIENT_id="f40f3e44c0fb9080a6e6b65388a7ea07"
const KAKAO_REDIRECT_URL="http://localhost:3000/oauth/callback/kakao"

const KakaoRedirectHandler = () => {
  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분

    let token = axios.post(
      `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${KAKAO_GRANT_TYPE}&client_id=${KAKAO_CLIENT_id}&redirect_uri=${KAKAO_REDIRECT_URL}&code=${code}`
      , {}).then(res => {
        window.localStorage.setItem('kakao', res.data.access_token)
      })
    let info = axios.post('http://localhost:3500/kakao/profile', {
      token: window.localStorage.getItem('kakao')
    }).then(res => {
      console.log(res)
    }) 
  }, []);

  return <div>ddd</div>;
};

export default KakaoRedirectHandler;



