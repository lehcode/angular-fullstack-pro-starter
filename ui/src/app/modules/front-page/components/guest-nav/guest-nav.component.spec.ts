import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestNavComponent } from './guest-nav.component';
// import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
// import { MatToolbarHarness } from '@angular/material/toolbar/testing';
// import { HarnessLoader } from '@angular/cdk/testing';
import { VINDecodeModule } from '~/app/modules/vin-decode/vin-decode.module';

describe('GuestNavComponent', () => {
  let component: GuestNavComponent;
  let fixture: ComponentFixture<GuestNavComponent>;
  // let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [VINDecodeModule],
        declarations: [GuestNavComponent]
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestNavComponent);
    // loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  // it('loads harness', async () => {
  //   const toolbarHarness = await loader.getHarness(MatToolbarHarness);
  // });
});
