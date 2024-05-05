// Import the Router service
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  // Inject the Router in the constructor
  constructor(private router: Router) {}

  onSubmit(): void {
    console.log('User Login', this.user);
    // Add your authentication logic here

    // Simulate a login success and redirect to home page
    this.loginUser(this.user);
  }

  loginUser(user: { email: string, password: string }): void {
    // Simulate login process
    console.log("Logging in user:", user);

    // Assume login is successful, then redirect
    this.router.navigate(['/']); // Redirect to the home page
  }
}


