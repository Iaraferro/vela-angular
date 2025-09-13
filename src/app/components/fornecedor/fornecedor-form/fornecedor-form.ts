import { Component } from '@angular/core';
import { Fornecedor } from '../../../models/fornecedor.model';
import { FornecedorService } from '../../../services/fornecedorService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fornecedor-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './fornecedor-form.html',
  styleUrl: './fornecedor-form.css'
})
export class FornecedorForm {
    fornecedor: Fornecedor = {
    id: 0,
    nome: '',
    cnpj: '',
    telefone: '',
    email: '',
    endereco: ''
  };

  constructor(
    private fornecedorService: FornecedorService,
    private router: Router
  ) {}

  onSubmit(): void {
   
     
  }
}
