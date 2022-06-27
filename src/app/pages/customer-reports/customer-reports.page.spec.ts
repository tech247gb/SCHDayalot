import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerReportsPage } from './customer-reports.page';

describe('CustomerReportsPage', () => {
  let component: CustomerReportsPage;
  let fixture: ComponentFixture<CustomerReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerReportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
