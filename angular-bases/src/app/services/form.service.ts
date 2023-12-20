import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  b: string;
  c: string;
  d: string;
  e: string;
  p: string;
}

export interface Preguntas {
  items: { [key: number]: Item };
  total: number;
}

export interface Form {
  form: Preguntas;
}

@Injectable({
  providedIn: 'root'
})
export class FormService {
  apiURL: string = 'https://flask-skeleton-bnruumvxca-nw.a.run.app/api/tests';

  constructor(private http: HttpClient) {}

  getForms(id: string): Observable<Form> {
    return this.http.get<Form>(`${this.apiURL}/${id}`);
  }
}
