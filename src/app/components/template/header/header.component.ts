import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../../services/sidebar-service';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatIcon, MatIconButton, MatMenuModule, MatMenuTrigger, MatDividerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private sidebarService: SidebarService){

  }
  clickMenu(){
    this.sidebarService.toggle();
  }
}
