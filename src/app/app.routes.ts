import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JuegosComponent } from './juegos/juegos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JuegosInventarioComponent } from './juegos-inventario/juegos-inventario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroUsuarioComponent},
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: '', component: JuegosComponent },
      { path: 'admin', component: UsuariosComponent },
      { path: 'inventario', component: JuegosInventarioComponent }
    ]
  }
];
