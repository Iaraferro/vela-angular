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
  deleteCliente(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
  }

  getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.baseUrl);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  findAll(page?: number, pageSize?: number) : Observable<Cliente[]>{
    let params = {};

    if (page !== undefined && pageSize ! == undefined){
      params = {
        page: page.toString(),
        pageSize: page.toString()
      }
    }
    return this.httpClient.get<Cliente[]>(`${this.baseUrl}`, {params});
  }
  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }
  
}
