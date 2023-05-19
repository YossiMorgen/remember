import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import FlowersModel from 'src/app/models/commemorative-models/flowers-model';
import { ConfigService } from 'src/app/utils/config.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlowersService {

    constructor(
      private http: HttpClient,
      private config: ConfigService,
    ) { }

    public async addFlower(commemorativeID: number){
      const observable = this.http.get<FlowersModel>(this.config.add_flower + commemorativeID);
      await firstValueFrom(observable);
    }

    public sumFlowersAmountByCommemorativeID(commemorativeID: number){
      const observable = this.http.get<number>(this.config.sum_commemorative_flowers + commemorativeID);
      return firstValueFrom(observable);
    }
  
}
