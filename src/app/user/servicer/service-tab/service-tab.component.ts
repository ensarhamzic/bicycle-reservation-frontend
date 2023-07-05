import { Component } from '@angular/core';
import { ServicerService } from 'src/app/services/servicer.service';
import { IService } from 'src/app/shared/models/service.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service-tab',
  templateUrl: './service-tab.component.html',
  styleUrls: ['./service-tab.component.css'],
})
export class ServiceTabComponent {
  services: IService[] = [];
  constructor(private service: ServicerService, private tostr: ToastrService) {
    this.service.getServices().subscribe((services) => {
      this.services = services;
    });
  }

  addService = (bicycleId: string) => {
    this.service.addService(bicycleId).subscribe((res) => {
      this.tostr.success('Service added');
      this.services = this.updateBicycleServiceDate(this.services, bicycleId);
    });
  };

  updateBicycleServiceDate(data: IService[], bicycleId: string) {
    const index = data.findIndex((bicycle) => bicycle.bicycle.id === bicycleId);
    if (index !== -1) {
      const utcNow = new Date().toUTCString();
      data[index].serviceDate = utcNow;
      data.push(data.splice(index, 1)[0]);
    }
    return data;
  }
}
