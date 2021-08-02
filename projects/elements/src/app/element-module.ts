import { createCustomElement } from '@angular/elements';
import { Injector } from '@angular/core';
const PREFIX = 'custom';
export abstract class ElementModule {
    constructor(injector: Injector, components: InstanceType<any>[], names: string[]) {
        components.forEach((component: InstanceType<any>, i)=>{
            const ngElement = createCustomElement(component, {
                injector,
            });
            customElements.define(`${PREFIX}-${names[i]}`, ngElement);
        })
       
    }
 
    ngDoBootstrap() {}
 }