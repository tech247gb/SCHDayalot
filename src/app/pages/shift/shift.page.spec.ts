import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterShiftPage } from './shift.page';

describe('EnterShiftPage', () => {
  let component: EnterShiftPage;
  let fixture: ComponentFixture<EnterShiftPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterShiftPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterShiftPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
