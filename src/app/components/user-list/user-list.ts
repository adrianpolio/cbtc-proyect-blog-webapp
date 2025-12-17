import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from "../../shared/header/header";

interface User {
  userId: number;
  name: string;
  surname: string;
  email: string;
  role: string;
}


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  error: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  get isAdminOrSuper(): boolean {
  return this.authService.isAdminOrSuper();
}


  ngOnInit(): void {
    if (!this.authService.isAdminOrSuper()) return;

    this.userService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.cdr.detectChanges();
      },
      error: () => this.error = 'Error al cargar usuarios'
    });
  }
}
