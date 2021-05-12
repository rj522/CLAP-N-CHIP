import { Artist } from './../models/artist';
import { Portfolio } from './../models/portfolio';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserState } from '../state/user.state';
import { Observable } from 'rxjs';
import { UserStateModel } from '../state/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.component.html',
  styleUrls: ['./portfolio-view.component.css']
})
export class PortfolioViewComponent implements OnInit {

  constructor(private store: Store, private afs: AngularFirestore, private router: Router )  {  }
  @Select(UserState) userState$: Observable<UserStateModel>;
  state: UserStateModel
  artist: Artist;
  ngOnInit() {
    this.userState$.subscribe(state => {
        this.state = state;
        console.log(state);
        if(state){
          var artist$ = this.afs.collection<Artist>('Artists').doc(state.artist_id).valueChanges();
          artist$.subscribe(artist => {
            this.artist = artist[0];
            console.log(this.artist);
          });
        }
    });
  }

  gotoPostList(){
    this.router.navigateByUrl('post-list');
  }

}
