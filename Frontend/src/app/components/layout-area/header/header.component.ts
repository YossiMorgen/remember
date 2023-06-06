import { Location } from '@angular/common';
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/utils/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public url: string = this.router.url.split('/')[1];
  public language = 'en'
  constructor(
    public authService: AuthService,
    @Inject(LOCALE_ID) public locale: string,
    public router: Router,
    public config: ConfigService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      this.url = this.router.url.split('/')[1]; 
    });

    this.language = this.locale;    
  }

  showEdit(){
    const arr = this.router.url.split('/');
    console.log(arr);
  console.log(this.authService.user.userID);
      
    if( arr[1] === 'commemorative' && +arr[2] === this.authService.user.userID ) {
      return true;
    }
    return false
  }
}
