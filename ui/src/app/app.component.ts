import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public title = '';
  showHeader = false;
  showSidebar = false;
  showFooter = false;

  public constructor(
      private breakpointObserver: BreakpointObserver,
      private router: Router,
      private activatedRoute: ActivatedRoute
  ) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe((result) => {
      if (result.matches) {
        this.activateHandsetLayout();
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // @ts-ignore
        this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader;
        // @ts-ignore
        this.showSidebar = this.activatedRoute.firstChild.snapshot.data.showSidebar;
        // @ts-ignore
        this.showFooter = this.activatedRoute.firstChild.snapshot.data.showFooter;
      }
    });
  }

  protected activateHandsetLayout() {
  }
}
