import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowPidyonComponent } from './row-pidyon.component';

describe('RowPidyonComponent', () => {
  let component: RowPidyonComponent;
  let fixture: ComponentFixture<RowPidyonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowPidyonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowPidyonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
