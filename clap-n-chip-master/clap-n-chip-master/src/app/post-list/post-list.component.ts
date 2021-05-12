import { AddArtistId } from './../state/user.action';
import { Post } from './../models/post';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Artist } from '../models/artist';
import { map, first } from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../state/user.state';
import { Observable } from 'rxjs';
import { UserStateModel } from '../state/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor(private afs: AngularFirestore, private sanitizer: DomSanitizer, private store: Store, private router: Router) { }
  postToDisplay;
  yt_string = "https://www.youtube.com/embed/";
  state: UserStateModel;
  chipAmountForm = new FormGroup({
    amount: new FormControl(''),
  });
  @Select(UserState) userState$: Observable<UserStateModel>;
  
  ngOnInit() {
    this.userState$.subscribe(state => {
      this.state = state;
    });

    

    var postSnapshot = this.afs.collection<Post>('Posts').snapshotChanges()
    .pipe(map(action => {
      return action.map(action => {
        const data = action.payload.doc.data() as Post;
        const id = action.payload.doc.id;
        return { id, data };
      })
    }));

    postSnapshot.subscribe(postSnap => {
      var postSnapList = postSnap.map(x=>{
        return { post: x.data, id: x.id}
      });
      var artistSnapshot = this.afs.collection<Artist>('Artists').snapshotChanges()
      .pipe(map(action => {
        return action.map(action => {
          const data = action.payload.doc.data() as Artist;
          const id = action.payload.doc.id;
          return { id, data };
        })
      }));

      artistSnapshot.subscribe((snap) => {
        var snapObjectList = snap.map(x => {
          return {artist: x.data, id: x.id };
        });
      
        this.postToDisplay = postSnapList.map(singlePost => {
          var artistWithMatchingID;
          if(snapObjectList.filter(x => x.id == singlePost.post.artist_id)[0]){
            artistWithMatchingID = snapObjectList.filter(x => x.id == singlePost.post.artist_id)[0].artist;
            return{
              ...singlePost.post,
              id: singlePost.id,
              youtube_url: this.sanitizer.bypassSecurityTrustResourceUrl(this.yt_string + singlePost.post.embedded_post_url),
              artist_name: artistWithMatchingID.firstName +  ' ' + artistWithMatchingID.lastName
            }
          }
        });
        console.log(this.postToDisplay);
      });
  });
}

  clap(id){

    var postToBeUpdated;
    this.postToDisplay.forEach(element => {
      if(element.id === id){
        postToBeUpdated = element;
      }
    });
    var exists = false;
    postToBeUpdated.claps.forEach(element => {
      if(element == this.state.id){
        exists = true;
      }
    });
    console.log(exists);
    if(!exists){
      var newCount = postToBeUpdated.claps_count + 1;
       var array = postToBeUpdated.claps;
       array.push(this.state.id);
       this.afs.collection<Post>('Posts').doc(id).update({
        artist_id: postToBeUpdated.artist_id,
        claps_count: newCount,
        post_description:postToBeUpdated.post_description,
        embedded_post_url: postToBeUpdated.embedded_post_url,
        claps: array,
        totalChipAmount: postToBeUpdated.totalChipAmount
    });
      console.log(postToBeUpdated);
    }
    
  }

  onSubmit(id){
    var postToBeUpdated;
    this.postToDisplay.forEach(element => {
      if(element.id === id){
        postToBeUpdated = element;
      }
    });
       this.afs.collection<Post>('Posts').doc(id).update({
        artist_id: postToBeUpdated.artist_id,
        claps_count: postToBeUpdated.claps_count,
        post_description:postToBeUpdated.post_description,
        embedded_post_url: postToBeUpdated.embedded_post_url,
        claps: postToBeUpdated.claps,
        totalChipAmount: postToBeUpdated.totalChipAmount + this.chipAmountForm.value.amount
    });
      console.log(postToBeUpdated);
  }

  getArtistPostfolio(artistId){
    this.store.dispatch(new AddArtistId(artistId));
    this.router.navigateByUrl('view-portfolio');
  }

}
