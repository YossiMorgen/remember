import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import AppService from '../services/app.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor( private auth: AuthService, private app: AppService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.app.loading = true;
    request = request.clone({

      
      setHeaders: {
          authorization: "Bearer " + this.auth.getToken()
      }
    })
    
    return next.handle(request);
  }
}
