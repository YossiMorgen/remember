import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public baseUrl = "http://localhost:3001/";
  private api = this.baseUrl + "api/";
  
  public login = this.api + "auth/login";
  public register = this.api + "auth/register";
  public isEmailExist = this.api + "auth/is_email_exist/";



  public random_commemorative = this.api + "random_commemorative";
  public commemorative_by_user = this.api + "commemorative_by_user/";
  public search_commemorative = this.api + "search_commemorative/";
  public commemorative_by_id = this.api + "commemorative_by_id/";
  public addCommemorative = this.api + "add_commemorative";
  public updateCommemorative = this.api + "update_commemorative/";
  public deleteCommemorative = this.api + "delete_commemorative/";

  public decease_images = this.api + "decease_images/";
  public add_decease_image = this.api + "add_decease_image";
  public delete_decease_image = this.api + "delete_decease_image/";

  public commemoration_sites = this.api + "commemoration_sites/";
  public commemoration_site = this.api + "commemoration_site/";
  public add_commemoration_site = this.api + "add_commemoration_site";
  public update_commemoration_site = this.api + "update_commemoration_site/";
  public delete_commemoration_site = this.api + "delete_commemoration_site/";

  public sum_commemorative_candles = this.api + "sum_commemorative_candles/";
  public add_candle = this.api + "add_candle/";

  public add_flower = this.api + "add_flower/";
  public sum_commemorative_flowers = this.api + "sum_commemorative_flowers/";
}
