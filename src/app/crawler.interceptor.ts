import { HttpInterceptorFn } from '@angular/common/http';

export const crawlerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor triggered:', req);

  // Clone the request and add a custom header
  const modifiedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'CustomValue', // Example custom header
    },
  });

  return next(modifiedRequest);
};

