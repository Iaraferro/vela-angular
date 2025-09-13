import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private baseUrl = 'http://localhost:8080/fornecedores';

  constructor(private httpClient: HttpClient) { }

  createFornecedor(fornecedor: FornecedorService): Observable<Fornecedor> {
    return this.httpClient.post<Fornecedor>(this.baseUrl, fornecedor);
  }

  getFornecedores(): Observable<Fornecedor[]> {
    return this.httpClient.get<Fornecedor[]>(this.baseUrl);
  }

  getFornecedorById(id: number): Observable<Fornecedor> {
    return this.httpClient.get<Fornecedor>(`${this.baseUrl}/${id}`);
  }
}
