import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'MakeAppointmentForm',
  templateUrl: './make-appointment-form.component.html',
  styleUrls: ['./make-appointment-form.component.scss']
})
export class MakeAppointmentFormComponent implements OnInit 
{

  constructor() { }

  ngOnInit(): void 
  {
    let appointmentDate = document.getElementById("AppointmentDate") as HTMLInputElement;
    let todayDate = new Date();
    let day = todayDate.getDate();
    let month = todayDate.getMonth() + 1;
    let year = todayDate.getFullYear();
    let dayStr = day < 10 ? '0' + day : day.toString();
    let monthStr = month < 10 ? '0' + month : month.toString();
    let todayDateStr = year + '-' + monthStr + '-' + dayStr;
    appointmentDate.setAttribute("min", todayDateStr);
  }

}
