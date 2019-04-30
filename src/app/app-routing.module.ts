import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';
import { AuthComponent } from './users/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { StoriesListComponent } from './stories/stories-list/stories-list.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth'
  },
  {
    path:'auth',
    component: AuthComponent
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts',
    component: PostsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stories',
    component: StoriesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'friends',
    component: FriendsListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
