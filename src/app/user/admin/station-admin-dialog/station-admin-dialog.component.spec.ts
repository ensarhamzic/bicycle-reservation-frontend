import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationAdminDialogComponent } from './station-admin-dialog.component';

describe('StationAdminDialogComponent', () => {
  let component: StationAdminDialogComponent;
  let fixture: ComponentFixture<StationAdminDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationAdminDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
