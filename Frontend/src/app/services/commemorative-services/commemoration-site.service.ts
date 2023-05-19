import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import CommemorationSitesModel from 'src/app/models/commemorative-models/commemoration-site-model';
import { ConfigService } from 'src/app/utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class CommemorationSiteService {
  public isThereMoreCommemorationSites: boolean = true;

  public commemorationSites: CommemorationSitesModel[] = [];

  constructor(
    private http:HttpClient, 
    private config: ConfigService,
  ) { }

  public async getAllCommemorationSitesByCommemorativeID(commemorativeID: number) {
    const observable = this.http.get<CommemorationSitesModel[]>(this.config.commemoration_sites + commemorativeID);

    const newCommemorationSites = await firstValueFrom(observable);

    this.commemorationSites = [...this.commemorationSites, ...newCommemorationSites];

    if(newCommemorationSites.length < 20){
      this.isThereMoreCommemorationSites = false;
    }
  }

  public async addCommemorationSite(commemoration: CommemorationSitesModel){
    const observable = this.http.post<CommemorationSitesModel>(this.config.add_commemoration_site, commemoration);

    const newCommemorationSite = await firstValueFrom(observable);

    this.commemorationSites = [...this.commemorationSites, newCommemorationSite];
  }

  public async updateCommemorationSite(commemoration: CommemorationSitesModel){
    const observable = this.http.put<CommemorationSitesModel>(this.config.update_commemoration_site, commemoration);

    const newCommemorationSite = await firstValueFrom(observable);

    this.commemorationSites = this.commemorationSites.filter(c => {
      if(c.commemorationSiteID === commemoration.commemorationSiteID){
        return newCommemorationSite;
      }
      return c;
    })
  }

  public async deleteCommemorationSite(commemorationID: number){
    const observable = this.http.delete<CommemorationSitesModel>(this.config.delete_commemoration_site + commemorationID);

    await firstValueFrom(observable);
  }
}
