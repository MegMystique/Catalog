import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BoroModule} from './boro/boro.module'
import {AppComponent} from './app.component';
import {DataService} from './boro/data.service'
import {DataStreamService} from './boro/data-stream.service'
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import 'rxjs/Rx';
import {AuthService} from './auth.service'
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, BoroModule, FormsModule, HttpClientModule,HttpModule,
  ],
  providers: [DataStreamService, DataService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
