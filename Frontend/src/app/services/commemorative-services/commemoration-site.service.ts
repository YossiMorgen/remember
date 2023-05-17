import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import CommemorationSitesModel from 'src/app/models/commemorative-models/commemoration-site-model';
import { ConfigService } from 'src/app/utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class CommemorationSiteService {

  constructor(
    private http:HttpClient, 
    private config: ConfigService,
  ) { }

  public async getAllCommemorationSitesByCommemorativeID(commemorativeID: string) {
    const observable = this.http.get<CommemorationSitesModel[]>(this.config.commemoration_sites);

    return await firstValueFrom(observable);

  }

  public async addCommemorationSite(commemorative: CommemorationSitesModel){
    const observable = this.http.post<CommemorationSitesModel>(this.config.add_commemoration_site, commemorative);

    return firstValueFrom(observable);
  }

  public async updateCommemorationSite(commemorative: CommemorationSitesModel){
    const observable = this.http.put<CommemorationSitesModel>(this.config.update_commemoration_site, commemorative);

    return firstValueFrom(observable);
  }

  public async deleteCommemorationSite(commemorativeID: number){
    const observable = this.http.delete<CommemorationSitesModel>(this.config.delete_commemoration_site + commemorativeID);

    await firstValueFrom(observable);
  }
}
