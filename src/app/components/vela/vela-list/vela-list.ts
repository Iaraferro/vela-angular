import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VelaService } from '../../../services/velaService';
import { Vela } from '../../../models/vela.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-vela-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './vela-list.html',
  styleUrl: './vela-list.css'
})
export class VelaList implements OnInit {
velas: Vela[] = [];

  constructor(private velaService: VelaService) {}

  ngOnInit(): void {
    this.carregarVelas();
  }

  carregarVelas(): void {
    this.velaService.getVelas().subscribe({
      next: (data) => {
        this.velas = data;
      },
      error: (err) => {
        console.error('Erro ao carregar velas:', err);
      }
    });
  }
}
