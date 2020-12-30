import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
      <app-guest-nav *ngIf="showGuestNav"></app-guest-nav>
      <app-header *ngIf="showHeader"></app-header>

      <div class="context">
          <app-sidebar *ngIf="showSidebar"></app-sidebar>
          <div class="content">
              <router-outlet></router-outlet>
          </div>
      </div>

      <app-footer *ngIf="showFooter"></app-footer>`,
})
export class AppComponent implements OnInit {
  public title = '';
  public showGuestNav = false;
  public showHeader = false;
  public showSidebar = false;
  public showFooter = false;

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
        // @ts-ignore
        this.showGuestNav = this.activatedRoute.firstChild.snapshot.data.showGuestNav;
      }
    });
  }

  protected activateHandsetLayout() {
  }
}
