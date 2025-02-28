import { HttpInterceptorFn } from '@angular/common/http';



/**
 * 
 * 
 * 
 * 
 */
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');

//Se houver um token, clona a requisição e adiciona cabeçalho a autorização
const authReq = token 
  ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
  })
  : req;

return next(authReq);

};