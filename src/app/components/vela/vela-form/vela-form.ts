import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vela } from '../../../models/vela.model';
import { Router } from '@angular/router';
import { VelaService } from '../../../services/velaService';

@Component({
  selector: 'app-vela-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vela-form.html',
  styleUrl: './vela-form.css'
})
export class VelaForm {
    vela: Vela = {
    id: 0,
    nome: '',
    fragrancia: '',
    tamanho: '',
    preco: 0,
    quantidadeEstoque: 0
  };

  constructor(
    private VelaService : VelaService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.VelaService.createVela(this.vela).subscribe({
      next: () => {
        this.router.navigate(['/velas']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar vela:', err);
      }
    });
  }
}
