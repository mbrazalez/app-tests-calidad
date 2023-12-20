import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations:[
    PreguntasComponent,
  ],
  exports: [
    PreguntasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})

export class PreguntasModule {}
