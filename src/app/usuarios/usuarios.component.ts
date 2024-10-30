import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  nombre: string | null;
  rol: string | null;


  constructor(private authService: AuthService, private router: Router) {
    this.nombre = this.authService.getName();
    this.rol = this.authService.getRol();
  }
  ngOnInit(): void {

    if (this.rol !== 'admin') {

      //this.router.navigate(['/']);
    }
  }
  Inventario(){
    this.router.navigate(['inventario'])
  }

}
