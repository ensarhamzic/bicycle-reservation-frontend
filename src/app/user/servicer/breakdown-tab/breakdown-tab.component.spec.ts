import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakdownTabComponent } from './breakdown-tab.component';

describe('BreakdownTabComponent', () => {
  let component: BreakdownTabComponent;
  let fixture: ComponentFixture<BreakdownTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakdownTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakdownTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
