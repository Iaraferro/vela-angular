import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../../services/clienteService';
import { Cliente } from '../../../models/cliente.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.css'
})
export class ClienteList {
 clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
      }
    });
  }
}
