import { User } from './../models/user';
import { Post } from './../models/post';
import { Artist } from './../models/artist';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseRepoService {

  constructor(private afs: AngularFirestore) { }

  public createArtist(artist: Artist){
    var artistCollection = this.afs.collection<Artist>('Artists');
    return artistCollection.add(artist);
  }

  public createUser(user: User){
    var artistCollection = this.afs.collection<User>('Users');
    return artistCollection.add(user);
  }

  public createPost(post: Post){
    var artistCollection = this.afs.collection<Post>('Posts');
    return artistCollection.add(post);
  }

  public getAllPosts(){
    return this.afs.collection<Post>('Posts');
  }

  getAllUsers(){

  }

  public getPortfolioOfArtist(emailID: string){
    
  }

  clapForPost(){

  }

  chipForPost(){

  }
  
}
