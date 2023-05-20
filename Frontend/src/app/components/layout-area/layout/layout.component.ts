import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import AppService from 'src/app/services/app.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public appService: AppService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['language']) {
        this.appService.language = params['language'];
      }
    });
  }


}
