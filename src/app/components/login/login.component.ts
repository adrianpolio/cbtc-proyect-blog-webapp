import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	username = ''
	password = ''
	error = ''

	constructor(
		private router: Router,
		private authService: AuthService
	) { }

	async login() {
		this.error = ''
		if (!this.username || !this.password) {
			this.error = 'Todos los campos son obligatorios';
			return;
		}
		const res = await fetch('http://localhost:8090/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: this.username,
				password: this.password
			})
		})

		if (!res.ok) {
			this.error = 'Credenciales inválidas'
			return
		}

		const data = await res.json()
		localStorage.setItem('token', data.token)
		localStorage.setItem('username', data.username)
		localStorage.setItem('userName', data.username)
		localStorage.setItem('userId', data.userId.toString())
		localStorage.setItem('role', data.role);

		this.authService.login(data.token, data.username, data.role)
		this.router.navigate(['/'])
	}
}
