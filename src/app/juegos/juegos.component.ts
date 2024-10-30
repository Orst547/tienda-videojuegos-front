import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Juego } from '../model/juegos.model';
import { JuegoService } from '../services/juego.service';

@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css'],
})
export class JuegosComponent implements OnInit {
  private juegoService = inject(JuegoService);
  juegos: Juego[] = [];
  esAdmin: boolean = false;

  ngOnInit() {
    this.obtenerJuegos();
    //this.verificarUsuario();
  }

  obtenerJuegos() {
    this.juegoService.getJuegos().subscribe({
      next: (data) => {
        console.log('Juegos recibidos:', data);
        this.juegos = data;
      },
      error: (error) => {
        console.error('Error al obtener juegos:', error);
      }
    });
  }

  verificarUsuario() {
    this.esAdmin = localStorage.getItem('rol') === 'admin';
  }


}
