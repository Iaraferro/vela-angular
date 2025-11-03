import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aroma } from '../models/aroma.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class aromaService {
  private apiUrl = 'http://localhost:8080/aromas';

  constructor(private http: HttpClient) { }

  listar(): Observable<Aroma[]> {
    return this.http.get<Aroma[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Aroma> {
    return this.http.get<Aroma>(`${this.apiUrl}/${id}`);
  }

  criar(aroma: Aroma): Observable<Aroma> {
     const aromaCompleto = {
        ...aroma,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    return this.http.post<Aroma>(this.apiUrl, aroma);
  }

  atualizar(id: number, aroma: Aroma): Observable<Aroma> {
    return this.http.put<Aroma>(`${this.apiUrl}/${id}`, aroma);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
