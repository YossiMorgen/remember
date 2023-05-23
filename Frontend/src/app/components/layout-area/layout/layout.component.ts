import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public language = 'en'
  constructor(
    private router: Router,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit(): void {
    this.language = this.locale;
  }
}
