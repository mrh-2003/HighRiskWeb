import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton, MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIcon, MatIconButton, MatButton, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  constructor() { }
  logout() {
    localStorage.removeItem('token');

  }
}
