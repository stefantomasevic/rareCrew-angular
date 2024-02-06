import { Component } from '@angular/core';
import { Employee } from 'src/models/employee';
import { TimeTrackingService } from 'src/services/time-tracking.service';
export type ChartOptions = {
   series: any;
   chart: any;
   responsive:any;
   labels: any;
};
@Component({
  selector: 'app-hourly-tracking',
  templateUrl: './hourly-tracking.component.html',
  styleUrls: ['./hourly-tracking.component.css'],
})
export class HourlyTrackingComponent {
  data: Employee[] = []; //data from api
  groupedData: any[] = []; //grouped by Name and total hours
  invalidEntries: Employee[] = [];

  public chartOptions: Partial<ChartOptions> = {
    series: [],  // Initialize series as an empty array
    chart: {
      type: 'pie',
      width: 600,
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  constructor(private timeTrackingService: TimeTrackingService) {
  }
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.timeTrackingService.getEmployees().subscribe((data: Employee[]) => {
      this.data = data;
      this.groupedData = this.groupData();
    });
  }

  private processEmployee(employee: Employee, grouped: any[]): void {
    const existingEmployee = grouped.find(e => e.EmployeeName === employee.EmployeeName);
    if (existingEmployee) {
      existingEmployee.TotalHours += this.calculateShiftDuration(employee);
    } else {
      grouped.push({
        EmployeeName: employee.EmployeeName,
        TotalHours: this.calculateShiftDuration(employee),
      });
    }
  }

  groupData(): any[] {
    const grouped: any[] = [];

    this.data.forEach((employee: Employee) => {
      this.processEmployee(employee, grouped);
    });

    this.chartOptions.series = grouped.map(employees => Math.round(employees.TotalHours));
    this.chartOptions.labels = grouped.map(employees => employees.EmployeeName ? employees.EmployeeName : 'unknown-INVALID');

    return grouped;
  }

  calculateShiftDuration(employee: Employee): number {
    const shiftStart = new Date(employee.StarTimeUtc);
    const shiftEnd = new Date(employee.EndTimeUtc);

    if (shiftStart >= shiftEnd) {
      this.invalidEntries.push(employee);
      return 0;
    }

    const durationInMs = shiftEnd.getTime() - shiftStart.getTime();
    return durationInMs / (1000 * 60 * 60);
  }
}
  


