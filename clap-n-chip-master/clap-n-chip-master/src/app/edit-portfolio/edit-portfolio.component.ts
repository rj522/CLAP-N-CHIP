import { AddId } from './../state/user.action';
import { Portfolio } from './../models/portfolio';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Artist } from '../models/artist';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';
import { UserStateModel } from '../state/user.model';
import { UserState } from '../state/user.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.css']
})
export class EditPortfolioComponent implements OnInit {

  constructor(private afs: AngularFirestore, private router: Router, private store: Store) { }
  editPortfolioForm;
  art: Artist[];
  @Select(UserState) userState$: Observable<UserStateModel>;
  id:string;

  ngOnInit() {
    this.userState$.subscribe(state => {
      this.id = state.id;
      var artist$ = this.afs.collection<Artist>('Artists', ref => ref.where('email', '==', state.email)).valueChanges();
      artist$.subscribe((art) => {
       if(art){
        console.log(art);
        this.art = art;
        if(art[0].portfolio){
          var port = art[0].portfolio;
            this.editPortfolioForm =   new FormGroup({
              story: new FormControl(port.story),
              values: new FormControl(port.values),
              note: new FormControl(port.note),
              youtube_url: new FormControl(port.youtube_url),
              instagram_url: new FormControl(port.instagram_url),
              facebook_url: new FormControl(port.facebook_url)
            });
        }
        else{
            console.log("here");
            this.editPortfolioForm =   new FormGroup({
              story: new FormControl(''),
              values: new FormControl(''),
              note: new FormControl(''),
              youtube_url: new FormControl(''),
              instagram_url: new FormControl(''),
              facebook_url: new FormControl('')
            });
        }
       }
    });
    });
  }

  updateData(){
      this.afs.collection<Artist>('Artists').doc(this.id).update({...this.art, portfolio: this.editPortfolioForm.value});
      this.router.navigateByUrl('/artist-portfolio');   
  }

}
