import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, firstValueFrom } from 'rxjs';
import { ConfigService } from '../utils/config.service';
import jwtDecode from 'jwt-decode';
import User from '../models/auth-models/user-model';
import CredentialsModel from '../models/auth-models/credentials-model';
import { ToastifyNotificationsService } from '../utils/toastify-notifications.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService{
    public userChanges = new Subject<void>();

    public user: User;
    private token: string;

    constructor( 
        private http: HttpClient, 
        private config: ConfigService, 
        private router : Router,
        private toast: ToastifyNotificationsService
    ){ 
      const token = window.localStorage.getItem('token')
      if( token ) this.setUser(token)
    }

    public async register( user: User ): Promise<void> {
        const observable = this.http.post<string>( this.config.register, user );
        const token = await firstValueFrom(observable);
        this.setUser(token)
    }

    public async login( credentials: CredentialsModel): Promise<void> {
        const observable = this.http.post<string>( this.config.login, credentials );
        const token = await firstValueFrom(observable);
        this.setUser(token)
    }

    public async isEmailExist(email: string): Promise<boolean> {
        const observable = this.http.get<boolean>( this.config.isEmailExist + email );
        return firstValueFrom(observable);
    }

    public logout():void{
        delete this.user;
        this.token = '';
        window.localStorage.removeItem('token')
        // this.router.navigate(['/login']);
    }

    private setUser(token: string):void{
        const decode: any = jwtDecode( token )
        this.token = token;
        window.localStorage.setItem('token', token );
        this.user = decode.user;
        this.userChanges.next();
    }

    public isLoggedIn():boolean{
        if(this.token && this.token != ''){
            const decode = jwtDecode( this.token ) as any;
            if(decode.exp < Date.now() / 1000) {                
                this.toast.error('Your session has expired, please login again');
                this.logout();
                return false;
            }
        }

        return true
    }

    public isAdmin():boolean{
        return this.user?.role === 'admin';
    }

    public getToken():string{
        return this.token;
    }
}
