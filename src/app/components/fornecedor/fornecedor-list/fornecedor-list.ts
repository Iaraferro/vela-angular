import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Fornecedor } from '../../../models/fornecedor.model';
import { FornecedorService } from '../../../services/fornecedorService';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-fornecedor-list',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './fornecedor-list.html',
  styleUrl: './fornecedor-list.css'
})
export class FornecedorList {
   fornecedores: Fornecedor[] = [];

  constructor(private fornecedorService: FornecedorService) {}

  ngOnInit(): void {
    this.carregarFornecedores();
  }

  carregarFornecedores(): void {
    this.fornecedorService.getFornecedores().subscribe({
      next: (data) => {
        this.fornecedores = data;
      },
      error: (err) => {
        console.error('Erro ao carregar fornecedores:', err);
      }
    });
  }
}
