import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SidebarService } from '../../../services/sidebar-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidebar',
  imports: [AsyncPipe, RouterModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
   constructor(public sidebarService: SidebarService) {}

  get isOpen$() {
    return this.sidebarService.isOpen$;
  }
}
