import { MESES } from '../constantes/config';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'soloMes'
})
export class SoloMesPipe implements PipeTransform {

  transform(value: string): any {
    const aux = value.split('-');
    return `${aux[2]} de ${MESES[aux[1]]}`;
  }

}
