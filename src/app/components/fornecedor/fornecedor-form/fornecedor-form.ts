import { Component } from '@angular/core';
import { Fornecedor } from '../../../models/fornecedor.model';
import { FornecedorService } from '../../../services/fornecedorService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fornecedor-form',
  standalone: true,
  imports: [FormsModule, MatTableModule, CommonModule],
  templateUrl: './fornecedor-form.html',
  styleUrl: './fornecedor-form.css'
})
export class FornecedorForm {
    fornecedor: Fornecedor = {
    id: 0,
    nome: '',
    cnpj: '',
   
  };

  displayedColumns: string[] = ['id', 'nome', 'cnpj', 'telefone', 'email', 'endereco'];
  dataSource: Fornecedor[] = [];

  constructor(
    private fornecedorService: FornecedorService,
    private router: Router
  ) {}

   ngOnInit(): void {
    this.carregarFornecedores();
  }

  carregarFornecedores(): void {
    // Implementar carregamento de fornecedores se necessário
    this.fornecedorService.getFornecedores().subscribe({
      next: (fornecedores: Fornecedor[]) => {
        this.dataSource = fornecedores;
      },
      error: (error: any) => {
        console.error('Erro ao carregar fornecedores:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.fornecedor.id === 0) {
      // Criar novo fornecedor
      this.fornecedorService.createFornecedor(this.fornecedor).subscribe({
        next: (fornecedorCriado: Fornecedor) => {
          console.log('Fornecedor criado:', fornecedorCriado);
          this.router.navigate(['/admin/fornecedores']);
        },
        error: (error) => {
          console.error('Erro ao criar fornecedor:', error);
        }
      });
    } else {
      // Atualizar fornecedor existente
      this.fornecedorService.createFornecedor(this.fornecedor).subscribe({
        next: (fornecedorAtualizado: Fornecedor) => {
          console.log('Fornecedor salvo:', fornecedorAtualizado);
          this.router.navigate(['/admin/fornecedores']);
        },
        error: (error: any) => {
          console.error('Erro ao salvar fornecedor:', error);
        }
      });
    }
  }

  limparFormulario(): void {
    this.fornecedor = {
      id: 0,
      nome: '',
      cnpj: '',
      
    };
  }

  cancelar(): void {
    this.router.navigate(['/fornecedores']);
  }
}
