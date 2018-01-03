import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FormlyModule} from "@ngx-formly/core";
import {FormlyMaterialModule} from "@ngx-formly/material";
import { RouterModule } from "@angular/router";
//import { NgxPaginationModule } from 'ngx-pagination'; // pagination module: http://michaelbromley.github.io/ngx-pagination/#/
//import { ModalModule } from 'ngx-bootstrap/modal'; // Modal https://valor-software.com/ngx-bootstrap/#/modals
//import { BsModalService } from 'ngx-bootstrap/modal';
//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; // Datepicker https://valor-software.com/ngx-bootstrap/#/modals
// import { WakandaService, AuthenticationService, AppGuard } from './services';
import { WakandaService} from './services';
import { MaterialModule } from './material.module';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    RouterModule//,
 //   NgxPaginationModule,
 //   ModalModule.forRoot(),
 //   BsDatepickerModule.forRoot()
  ],
  declarations: [],
  exports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    RouterModule//,
//    NgxPaginationModule,
 //   ModalModule,
 //   BsDatepickerModule
  ],
  providers: [
    WakandaService// ,
//    AuthenticationService,
//    AppGuard,
//    BsModalService
  ],
})
export class SharedModule { }
