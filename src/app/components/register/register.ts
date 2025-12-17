import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  nickname = '';
  name = '';
  surname = '';
  email = '';
  phone = '';
  password = '';
  error = '';
  success = '';

  constructor(private router: Router, private authService: AuthService) {}

  async register() {
    this.error = '';
    if (!this.nickname || !this.name || !this.surname || !this.email || !this.phone || !this.password) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    try {
      const res = await fetch('http://localhost:8090/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: this.nickname,
          name: this.name,
          surname: this.surname,
          email: this.email,
          phone: this.phone,
          password: this.password,
          role: 'USER' 
        })
      });

      if (!res.ok) {
        const err = await res.json();
        this.error = err.message || 'Error al registrar usuario';
        return;
      }

      const data = await res.json();
      this.success = 'Usuario registrado correctamente, redirigiendo al login...';
      
      setTimeout(() => this.router.navigate(['/login']), 1500);

    } catch (e) {
      this.error = 'Error de conexión con el servidor';
    }
  }
}
