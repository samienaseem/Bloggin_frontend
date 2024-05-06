import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  // Define the user object with properties that you're binding in the template
  user = {
    name: '',
    urn: '',
    email: '',
    password: ''
  };

  constructor() {}

  // Define the onSignup method that will be called when the form is submitted
  onSignup(): void {
    console.log('Signup:', this.user);
    // Here you would typically handle the signup logic, such as sending the user data to a server
    sessionStorage.setItem('userData', JSON.stringify(this.user));
    alert('Signup successful! You can now login with your credentials.');
  }
}
