import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vela } from '../models/vela.model';

@Injectable({
  providedIn: 'root'
})
export class VelaService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/velas';
   
  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Vela[]>{
    let params = {};

    if ((page !== undefined) && (pageSize !== undefined)){
      params = {
        page: page.toString(),
        size: pageSize.toString()
      }
    }
    return this.httpClient.get<Vela[]>(this.baseUrl, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }
  
  getVelas(): Observable<Vela[]> {
    return this.httpClient.get<Vela[]>(this.baseUrl);
  }
  getVelaById(id: number): Observable<Vela> {
    return this.httpClient.get<Vela>(`${this.baseUrl}/${id}`);
  }

  cadastrarVela(velaData: any): Observable<any> {
  return this.http.post(this.baseUrl, velaData);
}
excluirVela(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`);
}



}
