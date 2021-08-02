import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { ChecklistLibModule } from '../../../../../checklist-lib/src/public-api';
import { ChecklistLibComponent } from '../../../../../checklist-lib/src/public-api';
import { ElementModule } from '../../element-module';
@NgModule({
    declarations: [
    ],
    imports: [
      BrowserModule,
      ChecklistLibModule,
    ],
    entryComponents: [ChecklistLibComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ChecklistModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, [ChecklistLibComponent], ['lib-checklist']);
    }
 }