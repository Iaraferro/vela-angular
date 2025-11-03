import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/clienteService';
import { Cliente } from '../../../models/cliente.model';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule,MatDividerModule, MatIconModule, RouterModule],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.css'
})
export class ClienteList implements OnInit{
 clientes: Cliente[] = [];
 totalRecords = 0;
 pageSize = 2;
 page = 0;



  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.carregarClientesPaginados();
  this.clienteService.count().subscribe({
    next: (data) => {
      this.totalRecords = data;
    },
    error: (err) => {
      console.error('Erro ao contar clientes:', err);
    }
  });
  }
  paginar(event: PageEvent): void {
      this.page = event.pageIndex;
      this.pageSize = event.pageSize;
      this.carregarClientesPaginados();
  }
  carregarClientesPaginados(): void {
    this.clienteService.findAll(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
      }
    });
  }

  excluirCliente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => {
          // Remove o cliente da lista localmente
          this.clientes = this.clientes.filter(cliente => cliente.id !== id);
          alert('Cliente excluído com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao excluir cliente:', err);
          alert('Erro ao excluir cliente. Tente novamente.');
        }
      });
    }
  }
}
