import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { PessoaFisicaService } from '../../../services/pessoa-fisica-service';

@Component({
  selector: 'app-pessoa-fisica-form',
  imports: [ ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './pessoa-fisica-form.html',
  styleUrl: './pessoa-fisica-form.css'
})
export class PessoaFisicaForm {
    pessoaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pessoaFisicaService: PessoaFisicaService
  ) {
    this.pessoaForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  salvar() {
    if (this.pessoaForm.valid) {
      console.log('Dados do formulário:', this.pessoaForm.value);
      // Implementar chamada do serviço aqui
    }

    this.pessoaFisicaService.create(this.pessoaForm.value).subscribe({
      next: (pessoaSalva) => {
        console.log('Pessoa salva com sucesso:', pessoaSalva);
        this.router.navigate(['/admin/pessoas-fisicas']); // Redireciona para a lista
      },
      error: (erro) => {
        console.error('Erro ao salvar pessoa:', erro);
        alert('Erro ao salvar pessoa física');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/admin/pessoas-fisicas']);
  }
}

