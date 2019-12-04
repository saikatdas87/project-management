import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterContainerComponent } from './toaster-container/toaster-container.component';
import {ToasterComponent} from "./toaster-container/toaster.component";



@NgModule({
  declarations: [ToasterContainerComponent, ToasterComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
