import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vela } from '../models/vela.model';

@Injectable({
  providedIn: 'root'
})
export class VelaService {
  private baseUrl = 'http://localhost:8080/velas';

  constructor(private httpClient: HttpClient) { }

  createVela(vela: Vela): Observable<Vela> {
    return this.httpClient.post<Vela>(this.baseUrl, vela);
  }

  getVelas(): Observable<Vela[]> {
    return this.httpClient.get<Vela[]>(this.baseUrl);
  }
  getVelaById(id: number): Observable<Vela> {
    return this.httpClient.get<Vela>(`${this.baseUrl}/${id}`);
  }
}
