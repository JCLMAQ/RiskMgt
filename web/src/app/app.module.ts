import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";


//import { ROUTES } from "./app.routes";

import { AppComponent } from './app.component';

// Shared module
import { SharedModule } from './shared/shared.module';

// App views

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  	// Angular modules
    HttpModule,
    
    // Views modules
    
    // Modules
    SharedModule,


//    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
