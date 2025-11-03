import { Component, OnInit, signal } from '@angular/core';
import { VelaService } from '../../../services/velaService';
import { Vela } from '../../../models/vela.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

type CardVela = {
  idVela?: number;
  nome?: string | null;
  tipo?: string | null;
  aroma?: string | null;
  preco?: number | null;
  ingrediente?: string | null;
  ritualAssociado?: string | null;
  estoque?: number | null;
  disponivel?: boolean | null;
  imagemUrl?: string;
};

@Component({
  selector: 'app-vela-card-list',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatPaginatorModule, MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule ],
  templateUrl: './vela-card-list.component.html',
  styleUrl: './vela-card-list.component.css'
})

export class VelaCardListComponent implements OnInit{

  velas: Vela[] = [];
  cards = signal<CardVela[]>([]);
  totalRecords =0;
  pageSize= 8;
  page = 0;
  searchTerm = '';
  private searchSubject = new Subject<string>();
  constructor(private velaService: VelaService) {}

  ngOnInit(): void {
     this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.page = 0;
      this.carregarDadosPagina();
    });
      this.carregarDadosPagina();
  }
  
  onSearchChange(term: string): void {
    this.searchSubject.next(term);
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarDadosPagina();
  }

  carregarDadosPagina(): void {
    // Busca dados paginados
    this.velaService.findAll(this.page, this.pageSize).subscribe(data => {
      this.velas = data;
      this.carregarCards();
    });

    // Busca total de registros
    this.velaService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }


  carregarCards(): void {
    const list: CardVela[] = this.velas.map(v => ({
      idVela: v.id,
      nome: v.nome,
      tipo: v.tipo,
      aroma: v.aroma,
      preco: v.preco,
      ingrediente: v.ingrediente,
      ritualAssociado: v.ritualAssociado,
      estoque: v.estoque,
      disponivel: v.disponivel ?? v.estoque > 0,
      imagemUrl:'https://i.pinimg.com/736x/39/aa/89/39aa89360ce50ede1c96e2d2277ab3fe.jpg'
    }));
    this.cards.set(list);
  }
 
   

  comprarAgora(vela: CardVela): void {
    console.log('Comprar vela:', vela);
    alert(`Vela "${vela.nome}" adicionada ao carrinho!`);
  }

  verDetalhes(vela: CardVela): void {
    console.log('Ver detalhes da vela:', vela);
    alert(`Detalhes da vela: ${vela.nome}\nPreço: R$ ${vela.preco}\nEstoque: ${vela.estoque}`);
  }

  limparPesquisa(): void {
    this.searchTerm = '';
    this.carregarDadosPagina();
  }
  
}
