import { Component, OnInit } from '@angular/core';
import { ConfigService } from '~/app/modules/config/config.service';

@Component({
  selector: 'app-guest-nav',
  templateUrl: './guest-nav.component.html',
  styleUrls: ['./guest-nav.component.scss']
})
export class GuestNavComponent implements OnInit {
  public navTitle = '';

  constructor(private readonly configService: ConfigService) {
    this.navTitle = 'vin4free.com';
  }

  ngOnInit(): void {
  }

}
