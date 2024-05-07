import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user = {
    name: '',
    urn: '',
    email: '',
    password: ''
  };

  constructor(private router: Router) {}  // Inject Router

  onSignup(): void {
    console.log('Signup:', this.user);
    // Typically, you handle the signup logic here, such as sending the user data to a server

    // For demonstration, simulate successful signup and store user data in sessionStorage
    sessionStorage.setItem('userData', JSON.stringify(this.user));

    // Alert the user of successful signup
    alert('Signup successful! You can now login with your credentials.');

    // Redirect the user to the login page
    this.router.navigate(['/login']);  // Navigate to login page
  }
}
