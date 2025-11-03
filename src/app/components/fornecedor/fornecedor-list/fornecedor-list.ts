import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Fornecedor } from '../../../models/fornecedor.model';
import { FornecedorService } from '../../../services/fornecedorService';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor-list',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './fornecedor-list.html',
  styleUrl: './fornecedor-list.css'
})
export class FornecedorList {
   fornecedores: Fornecedor[] = [];
   carregando: boolean = true;
   erroCarregamento: string = '';
  constructor(
   private fornecedorService: FornecedorService,
   private router: Router 
  ) {}

  ngOnInit(): void {
    this.carregarFornecedores();
  }

  carregarFornecedores(): void {
   this.carregando = true;
    this.erroCarregamento = '';
    
    this.fornecedorService.getFornecedores().subscribe({
      next: (data: Fornecedor[]) => {
        this.fornecedores = data;
        this.carregando = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar fornecedores:', err);
        this.erroCarregamento = 'Erro ao carregar a lista de fornecedores.';
        this.carregando = false;
      }
    });
  }

  novoFornecedor(): void {
    this.router.navigate(['/admin/fornecedores/novo']);
  }

  editarFornecedor(id: number): void {
    this.router.navigate(['/admin/fornecedores/editar', id]);
  }

  excluirFornecedor(fornecedor: Fornecedor): void {
    if (confirm(`Tem certeza que deseja excluir o fornecedor "${fornecedor.nome}"?`)) {
      // Se o método delete existir no serviço
      if ('deleteFornecedor' in this.fornecedorService) {
        (this.fornecedorService as any).deleteFornecedor(fornecedor.id).subscribe({
          next: () => {
            console.log('Fornecedor excluído com sucesso');
            this.carregarFornecedores(); // Recarregar a lista
          },
          error: (error: any) => {
            console.error('Erro ao excluir fornecedor:', error);
            alert('Erro ao excluir fornecedor.');
          }
        });
      } else {
        console.warn('Método deleteFornecedor não disponível no serviço');
        alert('Funcionalidade de exclusão não disponível.');
      }
    }
  }

  formatarCNPJ(cnpj: string): string {
    if (!cnpj) return '';
    // Formatação básica de CNPJ: XX.XXX.XXX/XXXX-XX
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

}
