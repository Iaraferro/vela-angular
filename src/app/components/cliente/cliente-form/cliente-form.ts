import { Component } from '@angular/core';
import { Cliente } from '../../../models/cliente.model';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/clienteService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css'
})
export class ClienteForm {
   cliente: Cliente = {
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    role:'CLIENTE'
  };

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.clienteService.createCliente(this.cliente).subscribe({
      next: () => {
        this.router.navigate(['/admin/clientes']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar cliente:', err);
      }
    });
  }
  cancelar(): void {
    this.router.navigate(['/admin/clientes']);
  }
}
