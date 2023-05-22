import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, getLocaleId } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public language = 'en'
  constructor(
    private router: Router,
    private location: Location,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit(): void {
    this.language = this.locale;
  }
}
