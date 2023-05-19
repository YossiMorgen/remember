import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import StoryModel from 'src/app/models/commemorative-models/story-model';
import { ConfigService } from 'src/app/utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  public stories: StoryModel[] = [];
  public isThereMoreStories = true;
  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  public async getCommemorativeStories(commemorativeID: number){
    const observable = this.http.get<StoryModel[]>(this.config.get_commemorative_stories + commemorativeID + "?offset=" + this.stories.length);
    const stories = await firstValueFrom(observable);
    this.stories = [...this.stories, ...stories];

    if(stories.length < 10) this.isThereMoreStories = false;
  }

  public async addStory(story: StoryModel){
    const observable = this.http.post<StoryModel>(this.config.add_story, story);
    const newStory = await firstValueFrom(observable);
    this.stories.unshift(newStory);
  }

  public async editStory(story: StoryModel){
    const observable = this.http.put<StoryModel>(this.config.update_story, story);
    const editedStory = await firstValueFrom(observable);
    this.stories = this.stories.map(s => s.storyID === editedStory.storyID ? editedStory : s);
  }

  public async deleteStory(storyID: number){
    const observable = this.http.delete<StoryModel>(this.config.delete_story + storyID);
    await firstValueFrom(observable);
    this.stories = this.stories.filter(s => s.storyID !== storyID);
  }
}
