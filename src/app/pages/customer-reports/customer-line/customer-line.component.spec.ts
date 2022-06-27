import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLineComponent } from './customer-line.component';

describe('CustomerLineComponent', () => {
  let component: CustomerLineComponent;
  let fixture: ComponentFixture<CustomerLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
