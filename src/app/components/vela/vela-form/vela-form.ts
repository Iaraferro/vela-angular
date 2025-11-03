import { Component, inject } from '@angular/core';

import { Vela } from '../../../models/vela.model';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VelaService } from '../../../services/velaService';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-vela-form',
  standalone: true,
  imports: [CommonModule, RouterModule,MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './vela-form.html',
  styleUrl: './vela-form.css'
})
export class VelaForm  {

  private fb = inject(FormBuilder);
  private velaService = inject(VelaService);
  private router = inject(Router);

    velaForm = this.fb.group({
    nome: ['', Validators.required],
    aroma: ['', Validators.required],
    tipo: [''],
    preco: [0, [Validators.required, Validators.min(0)]],
    estoque: [0, [Validators.required, Validators.min(0)]],
    ingrediente: [''],
    ritualAssociado: ['']
  });

  onSubmit(): void {
  if (this.velaForm.valid) {
    console.log('Dados enviados:', this.velaForm.value);
    
    // Remove o campo 'tipo' que não existe no backend
    const dadosParaEnviar = {
      nome: this.velaForm.value.nome,
      aroma: this.velaForm.value.aroma,
      preco: this.velaForm.value.preco,
      estoque: this.velaForm.value.estoque,
      ingrediente: this.velaForm.value.ingrediente || '',
      ritualAssociado: this.velaForm.value.ritualAssociado || ''
    };
  

  this.velaService.cadastrarVela(dadosParaEnviar).subscribe({
      next: (response) => {
        console.log('Sucesso:', response);
        alert('Vela cadastrada!');
        this.router.navigate(['/admin/velas']);
      },
      error: (err) => {
        console.error('Erro completo:', err);
        alert('Erro: ' + (err.error?.message || err.message));
      }
    });
  }
}
}


  
