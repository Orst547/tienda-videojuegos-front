import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, MatButtonModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  nombre: string | null;
  constructor(private router: Router, private authService: AuthService) {
    this.nombre = this.authService.getName();
  }


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.getRol() === 'admin';
  }
  Login() {
    this.router.navigate(['/login']);
  }
  Registro() {
    this.router.navigate(['registro'])
  }
  Admin() {
    this.router.navigate(['admin']);
  }
  Home(){
    this.router.navigate(['']);
  }

  logout() {
    this.authService.logout();
  }
}
