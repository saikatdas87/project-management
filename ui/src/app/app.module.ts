import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AngularFontAwesomeModule} from "angular-font-awesome";
import {ProductListComponent} from './product/product-list/product-list.component';
import {NgbModalModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProductModule} from "./product/product.module";
import {RoutingModule} from "./routing/routing.module";
import {ProductService} from "./services/product.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'Csrf-Token',
      headerName: 'Csrf-Token',
    }),
    FormsModule,
    RoutingModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    NgbModalModule,
    BrowserAnimationsModule,
    ProductModule,
    BrowserAnimationsModule, // required animations module
    //ToastrModule.forRoot(),
    NgbTypeaheadModule,
    // ToastrModule added
  ],
  entryComponents: [],
  providers: [
    ProductService,
    //ToasterService //TODO- show toaster error in case of server error
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
