import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseRepoService } from '../service/firebase-reop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  constructor(private firebaseRepo: FirebaseRepoService, private router: Router) { }

  ngOnInit() {
  }

  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit(){
    this.firebaseRepo.createUser(this.userForm.value).then((x) => { 
      this.router.navigateByUrl('/user-login');
    });
  }
  
  gotoUserLogin(){
    this.router.navigateByUrl('/user-login');
  }
}
