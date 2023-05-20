import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { tap } from 'rxjs';
import { Router } from "@angular/router";
import { ToastService } from "angular-toastify";
import AppService from "../services/app.service";
@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService, 
    private router : Router,
    private toast: ToastService,
    private app : AppService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: (event : any) => {
          if (event instanceof HttpResponse) {
            this.app.loading = false;
          }
          return event;
        },
        error: (error : any) => {
          this.app.loading = false;
          if(error.status === 401) {
            this.auth.logout();
            this.router.navigate(['/login']);
            this.toast.error("token expired, please login again")
          }
        }
      }));
  }
}
