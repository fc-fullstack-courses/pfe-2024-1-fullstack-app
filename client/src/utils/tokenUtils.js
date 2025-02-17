import { jwtDecode } from 'jwt-decode';

export function checkToken (token) {

  if(!token) {
    return false;
  }

  /*
    якщо токен валідний то нам повернуть його payload
      exp у payload-і це час протухання токену у секундах від Unix epoch
  */
  const { exp } = jwtDecode(token);

  const currentTime = Date.now();

  // 5000 - буфер часу який дозволить майже протухнувший токен не відправляти
  return (exp * 1000) > currentTime + 5000;
}
