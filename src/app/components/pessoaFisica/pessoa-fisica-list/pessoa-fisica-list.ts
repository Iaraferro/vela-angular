import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { PessoaFisica } from '../../../models/pessoa-fisica.model';
import { PessoaFisicaService } from '../../../services/pessoa-fisica-service';




@Component({
  selector: 'app-pessoa-fisica-list',
  imports: [CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './pessoa-fisica-list.html',
  styleUrl: './pessoa-fisica-list.css'
})
export class PessoaFisicaList implements OnInit{
      
      pessoas: PessoaFisica[] = [];
      displayedColumns: string[] = ['id', 'nome', 'cpf', 'acoes'];
      dataSource = new MatTableDataSource<PessoaFisica>();
      isLoading = true;

      @ViewChild(MatPaginator) paginator!: MatPaginator;

      constructor(private pessoasFisicaService: PessoaFisicaService){}

      ngOnInit(): void {
          this.carregarPessoas();
      }

      ngAfterViewInit(){
        this.dataSource.paginator= this.paginator;
      }

      carregarPessoas(){
        this.isLoading = true;
        this.pessoasFisicaService.getAll().subscribe({
          next: (pessoas) => {
            this.pessoas = pessoas;
            this.dataSource.data = pessoas;
            this.isLoading= false;
          },
          error: (erro) => {
            console.error('Erro ao carregar pessoas físicas:', erro)
            this.isLoading= false;
          }
        });
      }

      formatarCPF(cpf: string): string {
        if (!cpf) return '';
        const numeros = cpf.replace(/\D/g, '');
        if (numeros.length === 11) {
        return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
        return cpf;
      }

      deletarPessoa(id: number){
        if(confirm('Tem certeza que deseja excluir esta pessoa?')){
          this.pessoasFisicaService.delete(id).subscribe({
            next: () => {
              this.carregarPessoas();
            },
            error: (error) => {
              console.error('Erro ao deletar pessoas:', error);
              alert('erro ao excluir pessoa');
            }
          });
        }
      }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
