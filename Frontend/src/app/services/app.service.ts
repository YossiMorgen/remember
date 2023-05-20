import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class AppService {

  constructor() { }

  public loading = false;

  public language = 'English';

}
