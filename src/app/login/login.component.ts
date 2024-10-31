import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false; // To manage loading state
  errorMessage: string | null = null; // To hold error messages

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
    });
  }

  Registro() {
    this.router.navigate(['/registro']);
  }

  login() {
    if (this.loginForm.valid) {
      this.loading = true; // Start loading
      const { correo, contrasena } = this.loginForm.value;

      this.http
        .post('http://26.39.90.38:8000/api/login', { correo, contrasena })
        .subscribe({
          next: (response: any) => {
            this.authService.login(response.token, response.rol, response.name);
            this.router.navigate(['']);
            this.loading = false; // Stop loading
          },
          error: (error) => {
            console.error('Error al iniciar sesión:', error);
            this.errorMessage = 'Credenciales incorrectas. Por favor, intenta de nuevo.';
            this.loading = false; // Stop loading
          },
        });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
    }
  }
}
