import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private baseUrl = "http://localhost:3001/api/";
  
  public login = this.baseUrl + "auth/login";
  public register = this.baseUrl + "auth/register";
  public isEmailExist = this.baseUrl + "auth/is_email_exist/";



  public random_commemorative = this.baseUrl + "random_commemorative";
  public commemorative_by_id = this.baseUrl + "commemorative_by_id/";
  public commemorative_by_user = this.baseUrl + "commemorative_by_user/";
  public addCommemorative = this.baseUrl + "add_commemorative";
  public updateCommemorative = this.baseUrl + "update_commemorative/";
  public deleteCommemorative = this.baseUrl + "delete_commemorative/";

  public decease_images = this.baseUrl + "decease_images/";
  public add_decease_image = this.baseUrl + "add_decease_image";
  public delete_decease_image = this.baseUrl + "delete_decease_image/";

  public commemoration_sites = this.baseUrl + "commemoration_sites/";
  public commemoration_site = this.baseUrl + "commemoration_site/";
  public add_commemoration_site = this.baseUrl + "add_commemoration_site";
  public update_commemoration_site = this.baseUrl + "update_commemoration_site/";
  public delete_commemoration_site = this.baseUrl + "delete_commemoration_site/";

  public sum_commemorative_candles = this.baseUrl + "sum_commemorative_candles/";
  public add_candle = this.baseUrl + "add_candle/";

  public add_flower = this.baseUrl + "add_flower/";
  public sum_commemorative_flowers = this.baseUrl + "sum_commemorative_flowers/";
}
