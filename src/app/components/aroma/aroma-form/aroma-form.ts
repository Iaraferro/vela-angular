import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Aroma } from '../../../models/aroma.model';
import { aromaService } from '../../../services/aromaService';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-aroma-form',
  imports: [CommonModule, FormsModule, RouterModule, MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule],
  templateUrl: './aroma-form.html',
  styleUrl: './aroma-form.css'
})
export class AromaForm {
     aroma: Aroma = {
    essenciaAromatica: ''
  };

   isEdit = false;
  loading = false;
  error = '';

  constructor(
    private aromaService: aromaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.carregarAroma(Number(id));
    }
  }

  carregarAroma(id: number): void {
    this.loading = true;
    this.aromaService.buscarPorId(id).subscribe({
      next: (data) => {
        this.aroma = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar aroma';
        this.loading = false;
        console.error('Erro:', error);
      }
    });
  }

  salvar() {
    this.loading = true;
     

     const aroma = {
        ...this.aroma,
        createdAt: this.isEdit ? this.aroma.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    if (this.isEdit) {
      this.aromaService.atualizar(this.aroma.id!, this.aroma).subscribe({
        next: (aromaSalvo) => {
          console.log('Aroma atualizado:', aromaSalvo);
          this.router.navigate(['/admin/aromas']);
        },
        error: (erro) => {
          this.error = 'Erro ao atualizar aroma';
          this.loading = false;
          console.error('Erro ao atualizar aroma:', erro);
        }
      });
    } else {
      this.aromaService.criar(this.aroma).subscribe({
        next: (aromaSalvo) => {
          console.log('Aroma salvo:', aromaSalvo);
          this.router.navigate(['/admin/aromas']);
        },
        error: (erro) => {
          this.error = 'Erro ao salvar aroma';
          this.loading = false;
          console.error('Erro ao salvar aroma:', erro);
        }
      });
    }
  }
}
