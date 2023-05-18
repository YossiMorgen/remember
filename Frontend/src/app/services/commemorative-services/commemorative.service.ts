import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import CommemorativeModel from 'src/app/models/commemorative-models/commemorative-model';
import { ConfigService } from 'src/app/utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class CommemorativeService {

  public commemorative: CommemorativeModel[] = [];

  constructor(
    private http:HttpClient, 
    private config: ConfigService,
  ) { }

  public async getRandomCommemorative( language: string) {
    const observable = this.http.get<CommemorativeModel[]>(this.config.random_commemorative + "?offset=" + this.commemorative.length + "&language=" + language);

    const commemorative = await firstValueFrom(observable);

    this.commemorative = [...this.commemorative, ...commemorative];
  }

  public async getCommemorativeById(id: string) {
    const observable = this.http.get<CommemorativeModel>(this.config.commemorative_by_id + id );

    return firstValueFrom(observable);
  }

  public async getCommemorativeByUser(){
    const observable = this.http.get<CommemorativeModel[]>(this.config.commemorative_by_user);

    return firstValueFrom(observable);
  }

  public async addCommemorative(commemorative: CommemorativeModel){
    const observable = this.http.post<CommemorativeModel>(this.config.addCommemorative, commemorative);

    return firstValueFrom(observable);
  }

  public async updateCommemorative(commemorative: CommemorativeModel){
    const observable = this.http.put<CommemorativeModel>(this.config.updateCommemorative, commemorative);

    return firstValueFrom(observable);
  }

  public async deleteCommemorative(commemorative: CommemorativeModel){
    const observable = this.http.delete<CommemorativeModel>(this.config.updateCommemorative);

    await firstValueFrom(observable);

    this.commemorative = this.commemorative.filter(c => c.commemorativeID !== commemorative.commemorativeID);
  }
  

}
