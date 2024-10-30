import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Verifica si el usuario está autenticado
  login(token: string, rol: string, name: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
    localStorage.setItem('name', name);
  }

  // Verifica si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Retorna true si hay un token
  }

  // Obtiene el rol del usuario
  getRol(): string | null {
    return localStorage.getItem('rol');
  }
  getName(): string | null {
    return localStorage.getItem('name');
  }

  // Cierra sesión y elimina los datos de localStorage
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('name');
  }
}
