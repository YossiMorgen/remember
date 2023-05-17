import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import DeceaseImagesModel from 'src/app/models/commemorative-models/decease-images-model';
import { ConfigService } from 'src/app/utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class DeceaseImagesService {


  public deceaseImages: DeceaseImagesModel[] = [];
  constructor(
    private http: HttpClient, 
    private config: ConfigService,
  ) { }
  public async getAllDeceaseImages(){
    const observable = this.http.get<DeceaseImagesModel[]>(this.config.decease_images);
    const deceaseImages = await firstValueFrom(observable);
    this.deceaseImages = [...this.deceaseImages, ...deceaseImages];
  }

  public async addDeceaseImage(deceaseImage: DeceaseImagesModel){
    const observable = this.http.post<DeceaseImagesModel>(this.config.add_decease_image, deceaseImage);
    const newDeceaseImage = await firstValueFrom(observable);
    this.deceaseImages = [...this.deceaseImages, newDeceaseImage];
  }

  public async deleteDeceaseImage(deceaseImageID: number){
    const observable = this.http.delete<DeceaseImagesModel>(this.config.delete_decease_image + deceaseImageID);
    await firstValueFrom(observable);
    this.deceaseImages = this.deceaseImages.filter(d => d.deceaseImageID !== deceaseImageID);
  }}
