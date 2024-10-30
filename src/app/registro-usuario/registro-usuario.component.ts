import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service'; // Asegúrate de que este servicio esté creado
import { Router } from '@angular/router';
import { Usuario } from '../model/usuarios.model';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel,MatError, MatButton, MatInput, CommonModule],
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.css'
})
export class RegistroUsuarioComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,  private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['cliente']
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const nuevoUsuario: Usuario = this.registroForm.value;
      this.usuarioService.createUsuario(nuevoUsuario).subscribe(
        response => {
          console.log('Usuario registrado:', response);
          this.registroForm.reset();
          this.router.navigate(['login']);
        },
        error => {
          console.error('Error al registrar el usuario:', error);
        }
      );
    }
  }

  Logearse(){
    this.router.navigate(['login']);
  }
}
