import { Injectable } from '@angular/core';
import { MESES } from '../constantes/config';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  fechas = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
  };

  constructor() { }

  format_to_yyyy_mm_dd(arreglo) {
    return `${arreglo[3]}-${this.fechas[arreglo[1]]}-${arreglo[2]}`;
  }

  sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  format_to_nice(fecha) {
    const aux = fecha.split('-');
    return `${aux[2]} de ${MESES[aux[1]]} del ${aux[0]}`;
  }

  from_calendar_to_DB(fecha: string) {
    const aux = fecha.split('/');
    return `${aux[2]}-${aux[1]}-${aux[0]}`;
  }

  from_DB_to_calendar(fecha: string) {
    const aux = fecha.split('-');
    return `${aux[2]}/${aux[1]}/${aux[0]}`;
  }

}
