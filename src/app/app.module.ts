import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { MatCardModule, MatIconModule,
         MatButtonModule, MatSidenavModule,
         MatToolbarModule, MatMenuModule,
         MatBadgeModule, MatTabsModule,
         MatInputModule, MatFormFieldModule } from '@angular/material';

import { AuthInterceptor } from './interceptors/auth-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { SignupComponent } from './users/signup/signup.component';
import { SigninComponent } from './users/signin/signin.component';
import { AuthComponent } from './users/auth/auth.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { StoriesListComponent } from './stories/stories-list/stories-list.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    SignupComponent,
    SigninComponent,
    AuthComponent,
    PostsListComponent,
    StoriesListComponent,
    FriendsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatBadgeModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
