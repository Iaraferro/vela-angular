import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Ingrediente } from '../../../models/ingrediente.model';
import { ingredienteService } from '../../../services/ingredienteService';

@Component({
  selector: 'app-ingrediente-form',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ingrediente-form.html',
  styleUrl: './ingrediente-form.css'
})
export class IngredienteForm implements OnInit {
ingrediente: Ingrediente = {
    pavio: '',
    recipiente: '',
    tipoCera: ''
  };
  
  isEdit = false;
  loading = false;
  error = '';

  constructor(
    private ingredienteService: ingredienteService,  // Nome correto
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.carregarIngrediente(Number(id));
    }
  }

  carregarIngrediente(id: number): void {
    this.loading = true;
    this.ingredienteService.getById(id).subscribe({
      next: (data) => {
        this.ingrediente = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar ingrediente';
        this.loading = false;
        console.error('Erro:', error);
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    
    if (this.isEdit) {
      // CORREÇÃO CRÍTICA: Passe o ID e o objeto separadamente
      this.ingredienteService.update(this.ingrediente.id!, this.ingrediente).subscribe({
        next: () => {
          this.router.navigate(['/admin/ingredientes']);
        },
        error: (error) => {
          this.error = 'Erro ao atualizar ingrediente';
          this.loading = false;
          console.error('Erro:', error);
        }
      });
    } else {
      this.ingredienteService.create(this.ingrediente).subscribe({
        next: () => {
          this.router.navigate(['/admin/ingredientes']);
        },
        error: (error) => {
          this.error = 'Erro ao criar ingrediente';
          this.loading = false;
          console.error('Erro:', error);
        }
      });
    }
  }

  // Adicione método cancelar
  cancelar(): void {
    this.router.navigate(['/ingredientes']);
  }
}
