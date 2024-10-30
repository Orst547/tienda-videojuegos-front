import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; // Importar Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Juego } from '../model/juegos.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-juego',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    CommonModule
  ],
  templateUrl: './dialog-juego.component.html',
  styleUrls: ['./dialog-juego.component.css'], // Corrección: 'styleUrls'
})
export class DialogJuegoComponent {
  @Output() juegoGuardado = new EventEmitter<Juego>();
  juegoForm: FormGroup;
  isEditMode: boolean; // Nueva propiedad para modo de edición

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogJuegoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Juego // Inyectar los datos del juego
  ) {
    // Determinar si estamos en modo de edición
    this.isEditMode = !!data;

    this.juegoForm = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      descripcion: [data?.descripcion || '', Validators.required],
      precio: [data?.precio || 0, [Validators.required, Validators.min(1)]],
      imagen: [data?.imagen || ''], // Cambiar a '' si no se edita
    });
  }

  guardarJuego(): void {
    if (this.juegoForm.valid) {
      this.juegoGuardado.emit({
        ...this.juegoForm.value,
        id: this.isEditMode ? this.data.id : null // Añadir ID si estamos editando
      });
      this.dialogRef.close();
    }
  }

  cancelar(): void {
    this.dialogRef.close(); // Cerrar el diálogo sin hacer nada
  }
}
