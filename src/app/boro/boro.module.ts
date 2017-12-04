import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoroComponent } from './boro/boro.component';
import { CardComponent } from './boro/card/card.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { PagesComponent } from './boro/pages/pages.component';
import { TreeViewComponent } from './boro/tree-view/tree-view.component';

@NgModule({
  imports: [
    CommonModule,FormsModule
  ],
  declarations: [BoroComponent, CardComponent, PagesComponent, TreeViewComponent],
  exports: [
    BoroComponent
  ]
})
export class BoroModule { }
