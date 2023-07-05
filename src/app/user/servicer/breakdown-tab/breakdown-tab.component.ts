import { Component } from '@angular/core';
import { ServicerService } from 'src/app/services/servicer.service';
import { IBreakdown } from 'src/app/shared/models/breakdown.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-breakdown-tab',
  templateUrl: './breakdown-tab.component.html',
  styleUrls: ['./breakdown-tab.component.css'],
})
export class BreakdownTabComponent {
  breakdowns: IBreakdown[] = [];

  constructor(private service: ServicerService, private tostr: ToastrService) {
    this.service.getBreakdowns().subscribe((breakdowns) => {
      this.breakdowns = this.getStationsWithUnresolvedBreakdowns(breakdowns);
    });
  }

  getStationsWithUnresolvedBreakdowns(data: IBreakdown[]) {
    return data.filter((station) => {
      let hasUnresolvedBreakdowns = false;
      station.bicycles.forEach((bicycle) => {
        bicycle.breakdowns = bicycle.breakdowns.filter(
          (breakdown) => !breakdown.resolvedDate
        );
        if (bicycle.breakdowns.length > 0) {
          hasUnresolvedBreakdowns = true;
        }
      });
      return hasUnresolvedBreakdowns;
    });
  }

  removeBicycleByBreakdownId(data: IBreakdown[], breakdownId: number) {
    return data.filter((station) => {
      station.bicycles = station.bicycles.filter((bicycle) => {
        return !bicycle.breakdowns.some(
          (breakdown) => breakdown.id === breakdownId
        );
      });
      return station.bicycles.length > 0;
    });
  }

  resolving(breakdownId: number) {
    this.service.resolveBreakdown(breakdownId).subscribe((data) => {
      this.tostr.success('Breakdown resolved successfully');
      this.breakdowns = this.removeBicycleByBreakdownId(
        this.breakdowns,
        breakdownId
      );
    });
  }
}
