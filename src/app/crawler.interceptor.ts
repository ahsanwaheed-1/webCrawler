import { HttpInterceptorFn } from '@angular/common/http';

export const crawlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
