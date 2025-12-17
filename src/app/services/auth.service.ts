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

  login(token: string, username: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)

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
}
