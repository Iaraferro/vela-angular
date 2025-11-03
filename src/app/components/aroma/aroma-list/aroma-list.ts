import { Component, OnInit, ViewChild } from '@angular/core';
import { Aroma } from '../../../models/aroma.model';
import { CommonModule } from '@angular/common';
import { aromaService } from '../../../services/aromaService';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-aroma-list',
  imports: [CommonModule,RouterModule,MatTableModule,
    MatPaginatorModule,
    MatCardModule],
  templateUrl: './aroma-list.html',
  styleUrl: './aroma-list.css'
})
export class AromaList implements OnInit{

  aromas: Aroma[] = [];
  displayedColumns: string[] = ['id', 'essenciaAromatica', 'acoes'];
  dataSource = new MatTableDataSource<Aroma>();
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private aromaService: aromaService) {}

  ngOnInit() {
    this.carregarAromas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  carregarAromas() {
    this.isLoading = true;
    this.aromaService.listar().subscribe({
      next: (aromas) => {
        this.aromas = aromas;
        this.dataSource.data = aromas;
        this.isLoading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar aromas:', erro);
        this.isLoading = false;
      }
    });
  }

  deletarAroma(id: number) {
    if (confirm('Tem certeza que deseja excluir este aroma?')) {
      this.aromaService.deletar(id).subscribe({
        next: () => this.carregarAromas(),
        error: (erro) => console.error('Erro ao deletar aroma:', erro)
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
