import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerTabComponent } from './servicer-tab.component';

describe('ServicerTabComponent', () => {
  let component: ServicerTabComponent;
  let fixture: ComponentFixture<ServicerTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicerTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
