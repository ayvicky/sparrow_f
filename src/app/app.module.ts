import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { EmojiPickerModule }  from 'ng2-emoji-picker';
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
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageChatComponent } from './messages/message-chat/message-chat.component';
import { DevelopersChatComponent } from './messages/developers-chat/developers-chat.component';
import { TestersChatComponent } from './messages/testers-chat/testers-chat.component';
import { DesignersChatComponent } from './messages/designers-chat/designers-chat.component';
import { PersonalChatComponent } from './personal-chat/personal-chat.component';
import { ToolbarComponent } from './home/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    SignupComponent,
    SigninComponent,
    AuthComponent,
    PostsListComponent,
    StoriesListComponent,
    FriendsListComponent,
    MessageListComponent,
    MessageChatComponent,
    DevelopersChatComponent,
    TestersChatComponent,
    DesignersChatComponent,
    PersonalChatComponent,
    ToolbarComponent
  ],
  imports: [
    EmojiPickerModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxAutoScrollModule,

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
    CookieService,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
