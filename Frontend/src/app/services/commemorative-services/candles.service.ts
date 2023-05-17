import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/utils/config.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandlesService {

  constructor(
    private http: HttpClient, 
    private config: ConfigService,
  ) { }

  public async sumCommemorativeCandles(){
    const observable = this.http.get<number>(this.config.sum_commemorative_candles);
    return observable;
  }

  public async addCandle(commemorativeID: number){
    const observable = this.http.get(this.config.add_candle + commemorativeID);
    return firstValueFrom(observable);
  }
}
