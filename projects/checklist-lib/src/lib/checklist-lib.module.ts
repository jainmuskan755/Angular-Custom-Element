import { NgModule, Injector } from '@angular/core';
import { ChecklistLibComponent } from './checklist-lib.component';
import { createCustomElement } from "@angular/elements"; 
import { ApplicationService } from './services/application.service';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './uikit/loader/loader.component';


@NgModule({
  declarations: [
    ChecklistLibComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ChecklistLibComponent
  ],
  providers:[
    ApplicationService
  ],
  entryComponents: [ChecklistLibComponent],
})
export class ChecklistLibModule {

  constructor(private injector: Injector) { 
    if (!customElements.get('checklist-widget')) {
      const element = createCustomElement(ChecklistLibComponent, { 

        injector: this.injector 
  
      }); 
  
      customElements.define("checklist-widget", element);
    }
  } 
 }
