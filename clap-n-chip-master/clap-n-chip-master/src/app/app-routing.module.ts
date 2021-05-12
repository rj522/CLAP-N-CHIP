import { PortfolioViewComponent } from './portfolio-view/portfolio-view.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { PostListComponent } from './post-list/post-list.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistLoginComponent } from './artist-login/artist-login.component';
import { ArtistPortfolioComponent } from './artist-portfolio/artist-portfolio.component';
import { EditPortfolioComponent } from './edit-portfolio/edit-portfolio.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  { path: '', component: FirstPageComponent },
  { path: 'artist-signup', component: SignupComponent },
  { path: 'artist-login', component: ArtistLoginComponent },
  { path: 'artist-portfolio', component: ArtistPortfolioComponent },
  { path: 'edit-portfolio', component: EditPortfolioComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'user-signup', component: UserSignupComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'post-list', component: PostListComponent },
  { path: 'view-portfolio', component: PortfolioViewComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
