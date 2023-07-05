import { Component } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent {
  loading = true;
  statistics: {
    stations: number;
    bicycles: number;
    rents: number;
    hoursRented: number;
    creditsSpent: number;
  } | null = null;

  constructor(private managerService: ManagerService) {
    this.managerService.getOverallStatistics().subscribe((statistics) => {
      this.statistics = statistics;
      this.loading = false;
    });
  }
}
