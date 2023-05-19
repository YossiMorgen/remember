import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import StoryModel from 'src/app/models/commemorative-models/story-model';
import { ConfigService } from 'src/app/utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {


  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  public async getCommemorativeStories(commemorativeID: number){
    const observable = this.http.get<StoryModel[]>(this.config.get_commemorative_stories + commemorativeID);
    const stories = await firstValueFrom(observable);
    return stories;
  }

  public async addStory(story: StoryModel){
    const observable = this.http.post(this.config.add_story, story);
    const newStory = await firstValueFrom(observable);
    return newStory;
  }

  public async deleteStory(storyID: number){
    const observable = this.http.delete<StoryModel>(this.config.delete_story + storyID);
    await firstValueFrom(observable);
  }
}
