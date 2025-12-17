import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken())
  private username$ = new BehaviorSubject<string | null>(
    localStorage.getItem('username')
  )

  isLoggedIn() {
    return this.loggedIn$.asObservable()
  }

  getUsername() {
    return this.username$.asObservable()
  }

  login(token: string, username: string, role: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    if (role) localStorage.setItem('role', role)

    this.loggedIn$.next(true)
    this.username$.next(username)
  }

  logout() {
    localStorage.clear()
    this.loggedIn$.next(false)
    this.username$.next(null)
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token')
  }

  isUser(): boolean { return localStorage.getItem('role') === 'USER'; }
  isAdmin(): boolean { return localStorage.getItem('role') === 'ADMIN'; }
  isSuperAdmin(): boolean { return localStorage.getItem('role') === 'SUPER_ADMIN'; }

  isAdminOrSuper(): boolean {
  const role = localStorage.getItem('role');
  return role === 'ADMIN' || role === 'SUPER_ADMIN';
  }
}
