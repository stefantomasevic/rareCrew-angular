import { Component } from '@angular/core';
import { Employee } from 'src/models/employee';
import { TimeTrackingService } from 'src/services/time-tracking.service';

@Component({
  selector: 'app-hourly-tracking',
  templateUrl: './hourly-tracking.component.html',
  styleUrls: ['./hourly-tracking.component.css']
})
export class HourlyTrackingComponent {
  data: Employee[] = [];
  groupedData: any[] = [];
  invalidEntries: Employee[] = [];

  constructor(private timeTrackingService: TimeTrackingService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.timeTrackingService.getEmployees().subscribe((data: Employee[]) => {
      this.data = data;
      this.groupedData = this.groupData();

    });
  }
  groupData() {
    const grouped: any[] = [];

    this.data.forEach((employees: Employee) => {
      const existingEmployee = grouped.find(e => e.EmployeeName === employees.EmployeeName);
      if (existingEmployee) {
        existingEmployee.TotalHours += this.calculateShiftDuration(employees);
      } else {
        grouped.push({
          EmployeeName: employees.EmployeeName,
          TotalHours: this.calculateShiftDuration(employees)
        });
      }
    });
    grouped.forEach(employees => {
      employees.TotalHours = Math.round(employees.TotalHours);
    });

    console.log(grouped);
    return grouped;
  }
  calculateShiftDuration(employee: Employee): number {
    const shiftStart = new Date(employee.StarTimeUtc);
    const shiftEnd = new Date(employee.EndTimeUtc);
    if (shiftStart >= shiftEnd) {

      console.log('Nelogičan unos: ', employee);
      this.invalidEntries.push(employee);
      return 0; // nemoj dodavati broj sati jer je neka greska, ne moze se smena zavrsiti pre nego sto je pocela
    }
    const durationInMs = shiftEnd.getTime() - shiftStart.getTime();
    const shiftDurationInHours = durationInMs / (1000 * 60 * 60);
    return shiftDurationInHours;
  }
}


