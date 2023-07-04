import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { IRecord } from 'src/app/shared/models/record.model';

@Component({
  selector: 'app-my-rented-bicyle',
  templateUrl: './my-rented-bicyle.component.html',
  styleUrls: ['./my-rented-bicyle.component.css'],
})
export class MyRentedBicyleComponent {
  record!: IRecord;
  loading: boolean = true;

  constructor(private clientService: ClientService) {
    this.clientService.getRentedBicycle().subscribe((record) => {
      this.record = record;
      this.loading = false;
    });
  }
}
