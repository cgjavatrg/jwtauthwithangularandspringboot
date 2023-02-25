import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmyaccountsComponent } from './viewmyaccounts.component';

describe('ViewmyaccountsComponent', () => {
  let component: ViewmyaccountsComponent;
  let fixture: ComponentFixture<ViewmyaccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmyaccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmyaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
