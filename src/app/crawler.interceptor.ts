import { HttpInterceptorFn } from '@angular/common/http';

export const crawlerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor triggered:', req);

  // Modify the request as needed
  const modifiedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN',
    },
  });

  return next(modifiedRequest);
};
