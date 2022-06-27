import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterComponent } from './enter.component';

describe('EnterComponent', () => {
  let component: EnterComponent;
  let fixture: ComponentFixture<EnterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
