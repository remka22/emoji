import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { EmojiCardComponent } from './components/emoji-card/emoji-card.component';
import { EmojiNavigateComponent } from './components/emoji-navigate/emoji-navigate.component';
import { EmojiComponent } from './page/emoji/emoji.component';
import { HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    EmojiCardComponent,
    EmojiNavigateComponent,
    EmojiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [EmojiComponent]
})
export class AppModule { }
