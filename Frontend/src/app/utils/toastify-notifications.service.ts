import { Injectable } from '@angular/core';
import { ToastService } from 'angular-toastify';

@Injectable({
  providedIn: 'root'
})
export class ToastifyNotificationsService {

  constructor( private toast: ToastService ) { }

  public success(message: string) {
    this.toast.success(message);
}

public error(error: any) {
    this.toast.error(this.getErrorMessage(error));
}

public message(message: string) {
    return this.toast.info(message);
}

public warning(message: string) {
    return this.toast.error(message);
}

private getErrorMessage(err: any): string {
    if (typeof err === "string") return err;
    if (typeof err?.error === "string") return err.error;
    if (typeof err.response?.data === "string") return err.response.data;
    if (typeof err?.message === "string") return err.message;
    return "Some error occurred, please try again later.";
}
}
