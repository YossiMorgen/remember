import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public language = 'en'
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.language = this.router.url.split('/')[1]
  }
}
