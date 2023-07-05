import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationServicerDialogComponent } from './station-servicer-dialog.component';

describe('StationServicerDialogComponent', () => {
  let component: StationServicerDialogComponent;
  let fixture: ComponentFixture<StationServicerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationServicerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationServicerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
