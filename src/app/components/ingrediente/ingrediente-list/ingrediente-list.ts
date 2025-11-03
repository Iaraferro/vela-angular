import { Component, OnInit } from '@angular/core';
import { Ingrediente } from '../../../models/ingrediente.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ingredienteService } from '../../../services/ingredienteService';


@Component({
  selector: 'app-ingrediente-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './ingrediente-list.html',
  styleUrl: './ingrediente-list.css'
})
export class IngredienteList implements OnInit {
ingredientes: Ingrediente[] = [];
  loading = true;
  error = '';

  constructor(private ingredienteService: ingredienteService) {}

  ngOnInit(): void {
    this.carregarIngredientes();
  }

  carregarIngredientes(): void {
    this.loading = true;
    this.ingredienteService.getAll().subscribe({
      next: (data) => {
        this.ingredientes = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar ingredientes';
        this.loading = false;
        console.error('Erro:', error);
      }
    });
  }

  excluirIngrediente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este ingrediente?')) {
      this.ingredienteService.delete(id).subscribe({
        next: () => {
          this.ingredientes = this.ingredientes.filter(i => i.id !== id);
        },
        error: (error) => {
          alert('Erro ao excluir ingrediente');
          console.error('Erro:', error);
        }
      });
    }
  }
}
