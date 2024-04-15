import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatSnackBarModule, MatInputModule, MatLabel, MatFormField, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  constructor(private loginService: LoginService, private snackBar: MatSnackBar, private router: Router) {   }
  login(){
    let user: User = {
      email: this.email.value!,
      password: this.password.value!
    }
    this.loginService.login(user).subscribe((data: any) => {
      localStorage.setItem('token', data.accessToken);
      this.snackBar.open('User logged in successfully', 'Close', {
        duration: 2000,
      });
      this.router.navigate(['/suppliers']);
    });
  }

  register(){
    let user: User = {
      email: this.email.value!,
      password: this.password.value!
    }
    this.loginService.register(user).subscribe((data) => {
      this.snackBar.open('User registered successfully', 'Close', {
        duration: 2000,
      });
    });
  }
}
