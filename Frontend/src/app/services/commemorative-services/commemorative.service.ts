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
  isThereMoreCommemorative: boolean = true;
  constructor(
    private http:HttpClient, 
    private config: ConfigService,
  ) { }

  public async getRandomCommemorative( language: string) {
    const observable = this.http.get<CommemorativeModel[]>(this.config.random_commemorative + "?offset=" + this.commemorative.length + "&language=" + language);

    const commemorative = await firstValueFrom(observable);

    this.commemorative = [...this.commemorative, ...commemorative];

    if(commemorative.length < 10){
      this.isThereMoreCommemorative = false;
    }
  }
  
  public async getCommemorativeByUser(){
    const observable = this.http.get<CommemorativeModel[]>(this.config.commemorative_by_user);

    const commemorative = await firstValueFrom(observable);

    this.commemorative = [...this.commemorative, ...commemorative];

    if(commemorative.length < 10){
      this.isThereMoreCommemorative = false;
    }  
  }

  public async searchCommemorative(search: string, language: string){
    const observable = this.http.get<CommemorativeModel[]>(this.config.search_commemorative + search + "?offset=" + this.commemorative.length + "&language=" + language);

    const commemorative = await firstValueFrom(observable);

    this.commemorative = [...this.commemorative, ...commemorative];

    if(commemorative.length < 10){
      this.isThereMoreCommemorative = false;
    }
  }
  

  public async getCommemorativeById(id: number): Promise<CommemorativeModel> {
    const observable = this.http.get<CommemorativeModel>(this.config.commemorative_by_id + id );

    return firstValueFrom(observable);
  }


  public async addCommemorative(commemorative: FormData){
    const observable = this.http.post<CommemorativeModel>(this.config.addCommemorative, commemorative);

    return firstValueFrom(observable);
  }

  public async updateCommemorative(commemorative: FormData, commemorativeID: number){
    const observable = this.http.put<CommemorativeModel>(this.config.updateCommemorative + commemorativeID, commemorative);

    return firstValueFrom(observable);
  }

  public async deleteCommemorative(commemorative: CommemorativeModel){
    const observable = this.http.delete<CommemorativeModel>(this.config.updateCommemorative);

    await firstValueFrom(observable);

    this.commemorative = this.commemorative.filter(c => c.commemorativeID !== commemorative.commemorativeID);
  }
  

}
