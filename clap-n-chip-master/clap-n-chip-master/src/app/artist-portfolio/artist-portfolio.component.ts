import { AddEmail, AddId } from './../state/user.action';
import { UserStateModel } from './../state/user.model';
import { Artist } from './../models/artist';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseRepoService } from '../service/firebase-reop.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { UserState } from '../state/user.state';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-artist-portfolio',
  templateUrl: './artist-portfolio.component.html',
  styleUrls: ['./artist-portfolio.component.css']
})
export class ArtistPortfolioComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any, private afs: AngularFirestore, private router: Router, private store: Store) { }
  artist$: Observable<any>;
  art: Artist;
 
  @Select(UserState) userState$: Observable<UserStateModel>;

  ngOnInit() {

    this.userState$.subscribe(state => {
      console.log(state);
      this.artist$ = this.afs.collection<Artist>('Artists', ref => ref.where('email', '==', state.email)).valueChanges();
      this.artist$.subscribe((art) => {
        if(art){
         this.art = art;
        }
     });
    });
    
    
  }

  gotoFacebook(){
    window.open("this.art[0].portfolio.facebook_url", "_blank");
  }

  gotoYoutube(){
    this.document.location.href = this.art[0].portfolio.youtube_url;
    console.log(this.art[0].portfolio.youtube_url);
  }

  gotoInstagram(){
    this.document.location.href = this.art[0].portfolio.instagram_url;
  }

  gotoEditPortfolio(){
    this.router.navigateByUrl('/edit-portfolio');
  }

  createPost(){
    this.router.navigateByUrl('/create-post');
  }

 
}
