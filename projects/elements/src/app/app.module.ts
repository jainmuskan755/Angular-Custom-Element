import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
import { ChecklistLibModule  } from '../../../checklist-lib/src/lib/checklist-lib.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ChecklistLibModule
  ],
  providers: [],
  bootstrap:[AppComponent]
})
export class AppModule { 
  ngDoBootstrap(){

  }
}
