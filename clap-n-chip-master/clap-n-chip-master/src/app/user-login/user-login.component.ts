import { Component, OnInit } from '@angular/core';
import { FirebaseRepoService } from '../service/firebase-reop.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { FormGroup, FormControl } from '@angular/forms';
import { Artist } from '../models/artist';
import { map } from 'rxjs/operators';
import { AddEmail, AddId } from '../state/user.action';
import { User } from '../models/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private firebaseRepo: FirebaseRepoService, private afs: AngularFirestore, private router: Router, private store: Store) { }
  ngOnInit() {
  }

  errorMessage: string;
  userLoginform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  
  onSubmit() {
    var userSnapshot = this.afs.collection<User>('Users', ref => ref.where('email', '==', this.userLoginform.value.email))
    .snapshotChanges()
    .pipe(map(action => {
      return action.map(action => {
        const data = action.payload.doc.data() as User;
        const id = action.payload.doc.id;
        return { id, data };
      })
    }));

    userSnapshot.subscribe((snap) => {
      var snapObject = snap.map(x => {
        return {user: x.data, id: x.id };
      });
      if (snapObject && snapObject[0].user.password === this.userLoginform.value.password) {
        console.log(snapObject[0].user.email);
        this.store.dispatch(new AddEmail(snapObject[0].user.email));
        this.store.dispatch(new AddId(snapObject[0].id));
        this.router.navigateByUrl('/post-list');
      } else {
        this.errorMessage = "UserName or Password Invalid";
      }
    });
  }
}
