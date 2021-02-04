import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})
export class FrontPageComponent implements OnInit {
  public title = 'RealFreeVIN.com :: Бесплатная расшифровка VIN-кода автомобиля';

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle($localize`${this.title}`);
  }
}
