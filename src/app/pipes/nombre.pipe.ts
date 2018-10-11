import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombre'
})
export class NombrePipe implements PipeTransform {

  transform(value: string): any {
    const aux = value.split(' ');
    let resultado;
    if (aux.length >= 4) {
      resultado = aux[0] + ' ' + aux[2];
    } else {
      resultado = value;
    }
    return resultado;
  }

}
