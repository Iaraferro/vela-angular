import { Component, OnInit } from '@angular/core';
import { VelaService } from '../../../services/velaService';
import { Vela } from '../../../models/vela.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-vela-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatCardModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './vela-list.html',
  styleUrl: './vela-list.css'
})
export class VelaList implements OnInit {
velas: Vela[] = [];
totalRecords = 0;
pageSize = 2;
page = 0;

displayedColumns: string[] = ['id', 'nome', 'aroma', 'tipo', 'preco', 'estoque', 'acoes'];

  constructor(private velaService: VelaService) {}

  ngOnInit(): void {
    this.carregarVelas();
  }

  paginar(event: PageEvent): void{
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarVelas();
  }



  carregarVelas(): void {
    this.velaService.findAll(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.velas = data;
        console.log('Velas carregadas:', this.velas);
        console.log('Quantidade de itens na página:', this.velas.length);
      },
      error: (err) => {
        console.error('Erro ao carregar velas:', err);
      }
    });

      this.velaService.count().subscribe({
      next: (data) => {
        this.totalRecords = data;
        console.log('Total de registros:', this.totalRecords);
      },
      error: (err) => {
        console.error('Erro ao contar registros:', err);
      }
    });
  }

 excluirVela(id: number): void {
  if (confirm('Tem certeza que deseja excluir esta vela?')) {
    this.velaService.excluirVela(id).subscribe({
      next: () => {
        alert('Vela excluída com sucesso!');
        this.carregarVelas(); // Recarrega a lista
      },
      error: (err) => {
        console.error('Erro ao excluir vela:', err);
        alert('Erro ao excluir vela: ' + (err.error?.message || err.message));
      }
    });
  }
}


}
