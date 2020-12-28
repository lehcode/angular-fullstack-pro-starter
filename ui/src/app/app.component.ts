import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = '';

  public constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait]).subscribe((result) => {
      if (result.matches) {
        this.activateHandsetLayout();
      }
    });
  }

  protected activateHandsetLayout() {}
}
