import { NgModule } from '@angular/core';
import { NombrePipe } from './nombre.pipe';
import { ImagenPipe } from './imagen.pipe';
import { SoloMesPipe } from './solo-mes.pipe';


@NgModule({
  imports: [],
  declarations: [
    NombrePipe,
    ImagenPipe,
    SoloMesPipe
  ],
  exports: [
    NombrePipe,
    ImagenPipe,
    SoloMesPipe
  ]
})
export class PipesModule { }
