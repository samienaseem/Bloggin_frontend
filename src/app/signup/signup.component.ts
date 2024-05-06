import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent {
  // Define the user object with properties that you're binding in the template
  user = {
    username:"",
    name: "",
    urn: "",
    email: "",
    password: "",
  };
  responseMessage = "";

  constructor(private userService: UserService) {}

  // Define the onSignup method that will be called when the form is submitted
  onSignup(): void {
    console.log("Signup:", this.user);
    // Here you would typically handle the signup logic, such as sending the user data to a server
    sessionStorage.setItem("userData", JSON.stringify(this.user));
    alert("Signup successful! You can now login with your credentials.");
  }

  signup() {
    this.userService.signup(this.user).subscribe(
      (response) => {
        this.responseMessage = response;
      },
      (error) => {
        this.responseMessage = 'Error: ' + error.message;
      }
    );
  }
}
