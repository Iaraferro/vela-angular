import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl = 'http://localhost:8080/clientes';

  constructor(private httpClient: HttpClient) { }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.baseUrl, cliente);
  }

  getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.baseUrl);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.baseUrl}/${id}`);
  }
}
