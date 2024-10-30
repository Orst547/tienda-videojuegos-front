import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Juego } from '../model/juegos.model';

@Injectable({
  providedIn: 'root', // Asegúrate de que esto esté configurado para proporcionar el servicio
})
export class JuegoService {
  private apiUrl = 'http://127.0.0.1:8000/api/juegos'; // Ajusta esto según sea necesario

  constructor(private http: HttpClient) {}

  getJuegos(): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.apiUrl);
  }

  createJuego(juego: Juego): Observable<Juego> {
    return this.http.post<Juego>(this.apiUrl, juego);
  }

  updateJuego(juego: Juego): Observable<Juego> {
    return this.http.put<Juego>(`${this.apiUrl}/${juego.id}`, juego);
  }

  deleteJuego(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
