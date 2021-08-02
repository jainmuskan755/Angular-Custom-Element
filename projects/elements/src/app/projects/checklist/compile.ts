import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ChecklistModule } from './checklist-module.module';
enableProdMode();

platformBrowserDynamic()
   .bootstrapModule(ChecklistModule)
   .catch(err => console.error(err));