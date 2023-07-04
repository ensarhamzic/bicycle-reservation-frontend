import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRentedBicyleComponent } from './my-rented-bicyle.component';

describe('MyRentedBicyleComponent', () => {
  let component: MyRentedBicyleComponent;
  let fixture: ComponentFixture<MyRentedBicyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRentedBicyleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRentedBicyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
