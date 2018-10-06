import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  fechas = {
    'Jan': 'Enero',
    'Feb': 'Febrero',
    'Mar': 'Marzo',
    'Apr': 'Abril',
    'May': 'Mayo',
    'Jun': 'Junio',
    'Jul': 'Julio',
    'Aug': 'Agosto',
    'Sep': 'Septiembre',
    'Oct': 'Octubre',
    'Nov': 'Noviembre',
    'Dec': 'Diciembre'
  };

  constructor() { }

  format_to_yyyy_mm_dd(arreglo){
    return arreglo[3]+'-'+arreglo[1]+'-'+arreglo[2];
  }

  sumarDias(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  format_to_nice(fecha){
    let aux = fecha.split("-");
    return `${aux[2]} de ${this.fechas[aux[1]]} del ${aux[0]}`;
  }
    
}