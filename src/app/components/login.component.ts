import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './login.component.html'
})
export class LoginComponent {
	username = ''
	password = ''
	error = ''

	constructor(private router: Router) {}

	async login() {
		this.error = ''

		const res = await fetch('http://localhost:8080/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.username,
				password: this.password
			})
		})

		if (!res.ok) {
			this.error = 'Credenciales inválidas'
			return
		}

		const data = await res.json()
		localStorage.setItem('token', data.token)

		this.router.navigate(['/blogs'])
	}
}
