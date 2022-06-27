import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShiftWithoutBarcodeComponent } from './shift-without-barcode.component';

describe('ShiftWithoutBarcodeComponent', () => {
  let component: ShiftWithoutBarcodeComponent;
  let fixture: ComponentFixture<ShiftWithoutBarcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftWithoutBarcodeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShiftWithoutBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
