import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(
    private datePipe : DatePipe
  ) { }

  getDataSemHora(form: FormGroup, campo:string): string {
    const data: Date = form.get(campo)?.value;
    if (data) {
      const dataSemHora = new Date(data.getFullYear(), data.getMonth(), data.getDate());

      return this.datePipe.transform(dataSemHora, 'yyyy-MM-dd')!;
    }
    return '';
  }

  getDataHoraSemFuso(form: FormGroup, campo:string): string {
    const data: Date = form.get(campo)?.value;
    if (data) {
      const datahoraSemFuso = new Date(data.getFullYear(), data.getMonth(), data.getDate(), data.getHours(), data.getMinutes(), data.getSeconds() );

      return this.datePipe.transform(datahoraSemFuso, 'yyyy-MM-ddThh:mm:ss')!;
    }
    return '';
  }
}
