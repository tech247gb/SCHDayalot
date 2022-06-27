import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PidyonReportsPage } from './pidyon-reports.page';

describe('PidyonReportsPage', () => {
  let component: PidyonReportsPage;
  let fixture: ComponentFixture<PidyonReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PidyonReportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PidyonReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
