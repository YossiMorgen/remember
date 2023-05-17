import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private baseUrl = "http://localhost:3001/api/";
  
  public login = this.baseUrl + "auth/login";
  public register = this.baseUrl + "auth/register";
  public isEmailExist = this.baseUrl + "auth/is_email_exist/";

  

  public random_commemorative = this.baseUrl + "commemorative/random_commemorative";
  public commemorative_by_id = this.baseUrl + "commemorative/commemorative_by_id/";
  public commemorative_by_user = this.baseUrl + "commemorative/commemorative_by_user/";
  public addCommemorative = this.baseUrl + "commemorative/add_commemorative";
  public updateCommemorative = this.baseUrl + "commemorative/update_commemorative/";
  public deleteCommemorative = this.baseUrl + "commemorative/delete_commemorative/";

  public decease_images = this.baseUrl + "commemorative/decease_images/";
  public add_decease_image = this.baseUrl + "commemorative/add_decease_image";
  public delete_decease_image = this.baseUrl + "commemorative/delete_decease_image/";

  public commemoration_sites = this.baseUrl + "commemorative/commemoration_sites/";
  public commemoration_site = this.baseUrl + "commemorative/commemoration_site/";
  public add_commemoration_site = this.baseUrl + "commemorative/add_commemoration_site";
  public update_commemoration_site = this.baseUrl + "commemorative/update_commemoration_site/";
  public delete_commemoration_site = this.baseUrl + "commemorative/delete_commemoration_site/";

  public commemorative_candles = this.baseUrl + "commemorative/commemorative_candles/";
  public candle_by_user = this.baseUrl + "commemorative/candle_by_user/";
  public add_candle = this.baseUrl + "commemorative/add_candle/";

  public user_flowers = this.baseUrl + "commemorative/user_flowers/";
  public add_flower = this.baseUrl + "commemorative/add_flower/";
  public flowers_amount = this.baseUrl + "commemorative/flowers_amount/";
}
