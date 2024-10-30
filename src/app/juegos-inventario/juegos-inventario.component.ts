import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { JuegoService } from '../services/juego.service';
import { Juego } from '../model/juegos.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DialogJuegoComponent } from '../dialog-juego/dialog-juego.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos-inventario',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule, MatButtonModule],
  templateUrl: './juegos-inventario.component.html',
  styleUrls: ['./juegos-inventario.component.css']
})
export class JuegosInventarioComponent implements OnInit {
  dataSource: MatTableDataSource<Juego>;
  juegos: Juego[] = [];
  rol: string | null;

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'acciones'];

  constructor(private juegoService: JuegoService, public dialog: MatDialog, private authService: AuthService, private router: Router) {
    this.dataSource = new MatTableDataSource<Juego>([]);
    this.rol = this.authService.getRol();
  }

  ngOnInit(): void {
    this.obtenerJuegos();
    if (this.rol !== 'admin') {

      //this.router.navigate(['/']);
    }
  }

  obtenerJuegos(): void {
    this.juegoService.getJuegos().subscribe(
      (juegos) => {
        this.dataSource = new MatTableDataSource(juegos);
      },
      (error) => console.error('Error al obtener los juegos:', error)
    );
  }

  abrirDialogo(juego?: Juego): void {
    const dialogRef = this.dialog.open(DialogJuegoComponent, {
      data: juego || null, // Pasa el juego si se está editando
    });

    dialogRef.componentInstance.juegoGuardado.subscribe((nuevoJuego: Juego) => {
      if (nuevoJuego.id) {
        // Editar juego existente
        this.juegoService.updateJuego(nuevoJuego).subscribe(updatedJuego => {
          const index = this.dataSource.data.findIndex(j => j.id === updatedJuego.id);
          if (index > -1) {
            this.dataSource.data[index] = updatedJuego; // Actualiza el juego en la lista
            this.dataSource._updateChangeSubscription(); // Actualiza la vista de la tabla
          }
        });
      } else {
        // Crear nuevo juego
        this.juegoService.createJuego(nuevoJuego).subscribe(createdJuego => {
          this.dataSource.data.push(createdJuego); // Agrega el nuevo juego a la lista
          this.dataSource._updateChangeSubscription(); // Actualiza la vista de la tabla
        });
      }
    });
  }

  editarJuego(juego: Juego): void {
    this.abrirDialogo(juego); // Abre el diálogo en modo de edición
  }

  eliminarJuego(id: number): void {
    this.juegoService.deleteJuego(id).subscribe(
      () => this.obtenerJuegos(),
      (error) => console.error('Error al eliminar el juego:', error)
    );
  }
}
