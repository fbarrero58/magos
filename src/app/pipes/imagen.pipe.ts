import { URL_IMAGENES } from '../constantes/config';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: any): any {

    return URL_IMAGENES + '' + img;
  }

}
