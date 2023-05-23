import { Location } from '@angular/common';
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/utils/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public path: string = this.location.path().split('/')[1];
  public language = 'en'
  constructor(
    public authService: AuthService,
    @Inject(LOCALE_ID) public locale: string,
    public location: Location,
    private router: Router,
    public config: ConfigService
  ) { }

  ngOnInit(): void {
    this.location.subscribe(() => {
      this.path = this.location.path().split('/')[1];
    });

    this.language = this.locale;
  }

  changeLanguage(event: any): void {
    console.log(event.target.value);
    this.locale = event.target.value;
    //  this.router.navigate([])
  }
}
