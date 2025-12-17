import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false
  username: string | null = null

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn()
      .subscribe(status => this.isLoggedIn = status)

    this.authService.getUsername()
      .subscribe(name => this.username = name)
  }

  login() {
    this.router.navigate(['/login'])
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/']) 
  }
}
