import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationClientDialogComponent } from './station-client-dialog.component';

describe('StationClientDialogComponent', () => {
  let component: StationClientDialogComponent;
  let fixture: ComponentFixture<StationClientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationClientDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
