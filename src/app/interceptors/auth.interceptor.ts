import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const token = localStorage.getItem('token');

  //   if (!req.url.startsWith("http://localhost:8080")) {
  //   return next(req);
  // }

  if (
        !req.url.startsWith(
            environment.apiUrl
        )
    ) {
        return next(req);
    }

    if (!token) {
        return next(req);
    }
  
    

    const authRequest = req.clone({

        setHeaders: {

            Authorization: `Bearer ${token}`

        }

    });

    return next(authRequest);

};