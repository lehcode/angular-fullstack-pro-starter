import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '~/app/services/config/app-config.service';

@Component({
  selector: 'app-vin-form',
  templateUrl: './vin-form.component.html',
  styleUrls: ['./vin-form.component.scss']
})
export class VINFormComponent implements OnInit {
  public apiUrl = '';

  constructor(private readonly appConfigService: AppConfigService) { }

  ngOnInit(): void {
    this.apiUrl = this.appConfigService.getValue('api.url') as string;
  }

}
