import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EndShiftComponent } from './end-shift.component';

describe('EndShiftComponent', () => {
  let component: EndShiftComponent;
  let fixture: ComponentFixture<EndShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndShiftComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EndShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
