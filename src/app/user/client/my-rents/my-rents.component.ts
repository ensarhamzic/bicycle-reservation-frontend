import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { IRecord } from 'src/app/shared/models/record.model';

@Component({
  selector: 'app-my-rents',
  templateUrl: './my-rents.component.html',
  styleUrls: ['./my-rents.component.css'],
})
export class MyRentsComponent {
  records: IRecord[] = [];
  currentRecord!: IRecord;
  loading: boolean = true;

  constructor(private clientService: ClientService) {
    this.clientService.getRents().subscribe((recs) => {
      console.log(recs);
      for (let rec of recs) {
        rec.endStation ? this.records.push(rec) : (this.currentRecord = rec);
      }
      this.loading = false;
    });
  }
}
