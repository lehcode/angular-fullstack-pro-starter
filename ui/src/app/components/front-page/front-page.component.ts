import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {
  public title = 'CARVIN :: Расшифровка VIN-кода автомобиля';

  constructor(
      private titleService: Title,
      private logger: NGXLogger
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
