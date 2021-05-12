import { AddId } from './../state/user.action';
import { Store } from '@ngxs/store';
import { Artist } from './../models/artist';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseRepoService } from '../service/firebase-reop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private firebaseRepo: FirebaseRepoService, private router: Router, private store: Store) { }

  artistform = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    post_ids: new FormControl(new Array())
  });

  ngOnInit() {
  }

  onSubmit() {
     this.firebaseRepo.createArtist(this.artistform.value).then((x) => { 
      this.router.navigateByUrl('/artist-login');
     });
     
  }

  gotoArtistLogin(){
    this.router.navigateByUrl('/artist-login');
  }
}




