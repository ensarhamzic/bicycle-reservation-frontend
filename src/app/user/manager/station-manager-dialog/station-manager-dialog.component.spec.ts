import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationManagerDialogComponent } from './station-manager-dialog.component';

describe('StationManagerDialogComponent', () => {
  let component: StationManagerDialogComponent;
  let fixture: ComponentFixture<StationManagerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationManagerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationManagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
