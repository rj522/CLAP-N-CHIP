import { AddEmail, AddId } from './../state/user.action';
import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseRepoService } from '../service/firebase-reop.service';
import { Artist } from '../models/artist';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-artist-login',
  templateUrl: './artist-login.component.html',
  styleUrls: ['./artist-login.component.css']
})
export class ArtistLoginComponent implements OnInit {

  constructor(private firebaseRepo: FirebaseRepoService, private afs: AngularFirestore, private router: Router, private store: Store) { }

  errorMessage: string;
  artistLoginform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
  }

  onSubmit() {
    var artistSnapshot = this.afs.collection<Artist>('Artists', ref => ref.where('email', '==', this.artistLoginform.value.email))
    .snapshotChanges()
    .pipe(map(action => {
      return action.map(action => {
        const data = action.payload.doc.data() as Artist;
        const id = action.payload.doc.id;
        return { id, data };
      })
    }));

    artistSnapshot.subscribe((snap) => {
      var snapObject = snap.map(x => {
        return {artist: x.data, id: x.id };
      });
      if (snapObject && snapObject[0].artist.password === this.artistLoginform.value.password) {
        console.log(snapObject[0].artist.email);
        this.store.dispatch(new AddEmail(snapObject[0].artist.email));
        this.store.dispatch(new AddId(snapObject[0].id));
        this.router.navigateByUrl('/artist-portfolio');
      } else {
        this.errorMessage = "UserName or Password Invalid";
      }
    });
  }

}
