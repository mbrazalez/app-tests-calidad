import { Component } from '@angular/core';
import { FormService, Preguntas, Item } from 'src/app/services/form.service';

export interface Puntos {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})

export class PreguntasComponent {
  preguntas: Preguntas = { items: {}, total: 0 };
  preguntaYRespuesta: { [key: string]: string } = {};
  preguntasMostradas: string[] = [];
  respuestas: string[] = [];
  respuestaSeleccionada: string = '';
  correccionPreguntas: { [key: number]: boolean | null } = {};
  isCorrect: boolean | null = null;
  puntoSeleccionado: string =  '657f58fee82907a911b1177e';


  puntos: Puntos[] = [
    {value: '657f58fee82907a911b1177e', viewValue: '2.3'},
    {value: '657f5905e82907a911b1177f', viewValue: '2.4'},
    {value: '657f590ae82907a911b11780', viewValue: '2.5'},
    {value: '657f5915e82907a911b11781', viewValue: '2.6'},
    {value: '657f5921e82907a911b11782', viewValue: '3.1'},
    {value: '657f5927e82907a911b11783', viewValue: '3.2'},
    {value: '657f592ee82907a911b11784', viewValue: '3.3'},

  ];
  

  constructor(public formService: FormService) {}

  ngOnInit(): void {
    this.formService.getForms(this.puntoSeleccionado).subscribe({
      next: (data) => {
        this.preguntas = data.form;
        Object.keys(this.preguntas.items).forEach(preguntaId => {
          const item: Item = this.preguntas.items[+preguntaId];

          // Generar un nuevo valor de randomizer para cada pregunta
          const randomizer: number = Math.ceil(Math.random() * 4);

          if (randomizer === 1) {
            this.respuestas.push(item.b);
            this.preguntaYRespuesta[item.p] = item.b;
            this.preguntasMostradas.push(item.p, item.b, item.c, item.d, item.e);
          } else if (randomizer === 2) {
            this.preguntaYRespuesta[item.p] = item.b;
            this.respuestas.push(item.b);
            this.preguntasMostradas.push(item.p, item.c, item.b, item.d, item.e);
          } else if (randomizer === 3) {
            this.preguntaYRespuesta[item.p] = item.b;
            this.respuestas.push(item.b);
            this.preguntasMostradas.push(item.p, item.e, item.b, item.c, item.d);
          } else if (randomizer === 4) {
            this.preguntaYRespuesta[item.p] = item.b;
            this.respuestas.push(item.b);
            this.preguntasMostradas.push(item.p, item.d, item.e, item.b, item.c);
          }
        });

        console.log(this.preguntasMostradas);
        console.log(this.respuestas);
      },
    });
  }

  comprobarRespuesta(respuesta: string, index: number) {
    this.correccionPreguntas[index] = this.respuestas.includes(respuesta);
  }

  mostrarRespuestaCorrecta(pregunta: string) { 
    console.log(this.preguntaYRespuesta);
    return this.preguntaYRespuesta[pregunta];
  }

  onPuntoSeleccionadoChange() {
    this.formService.getForms(this.puntoSeleccionado).subscribe({
      next: (data) => {
        this.preguntas = { items: {}, total: 0 };
        this.preguntasMostradas = [];
        this.preguntas = data.form;
        this.correccionPreguntas = {};
        Object.keys(this.preguntas.items).forEach(preguntaId => {
          const item: Item = this.preguntas.items[+preguntaId];

          // Generar un nuevo valor de randomizer para cada pregunta
          const randomizer: number = Math.ceil(Math.random() * 4);

          if (randomizer === 1) {
            this.preguntaYRespuesta[item.p] = item.b;
            this.respuestas.push(item.b);
            this.preguntasMostradas.push(item.p, item.b, item.c, item.d, item.e);
          } else if (randomizer === 2) {
            this.preguntaYRespuesta[item.p] = item.b;
            this.respuestas.push(item.b);
            this.preguntasMostradas.push(item.p, item.c, item.b, item.d, item.e);
          } else if (randomizer === 3) {
            this.preguntaYRespuesta[item.p] = item.b;
            this.respuestas.push(item.b);
            this.preguntasMostradas.push(item.p, item.e, item.b, item.c, item.d);
          } else if (randomizer === 4) {
            this.preguntaYRespuesta[item.p] = item.b;
            this.respuestas.push(item.b);
            this.preguntasMostradas.push(item.p, item.d, item.e, item.b, item.c);
          }
        });

      },
    });
  }
  
}
