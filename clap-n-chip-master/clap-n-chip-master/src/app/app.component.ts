import { FirebaseRepoService } from './service/firebase-reop.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {AngularFirestore } from '@angular/fire/firestore';
import { Observable } from "rxjs/Rx"
import { firestore } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  firestore: AngularFirestore;

  constructor(db: AngularFirestore, cd: ChangeDetectorRef, firebaseRepo: FirebaseRepoService) {
    this.firestore = db;
    // this.messages$ = this.firestore.collection('messages').valueChanges();
    // this.messages$.subscribe((message) => {
    //   this.messages = message;
    //   console.log(this.messages[0].message);
    //   cd.detectChanges();
    // });
    
  }

  ngOnInit(){

  }

  public messages$: Observable<any>;

}
