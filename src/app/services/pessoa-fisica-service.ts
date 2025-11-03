import { Injectable } from '@angular/core';
import { PessoaFisica } from '../models/pessoa-fisica.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PessoaFisicaService {
  private apiUrl = 'http://localhost:8080/pessoas-fisicas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PessoaFisica[]> {
    return this.http.get<PessoaFisica[]>(this.apiUrl);
  }

  getById(id: number): Observable<PessoaFisica> {
    return this.http.get<PessoaFisica>(`${this.apiUrl}/${id}`);
  }

  create(pessoa: PessoaFisica): Observable<PessoaFisica> {
    return this.http.post<PessoaFisica>(this.apiUrl, pessoa);
  }

  update(id: number, pessoa: PessoaFisica): Observable<PessoaFisica> {
    return this.http.put<PessoaFisica>(`${this.apiUrl}/${id}`, pessoa);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
