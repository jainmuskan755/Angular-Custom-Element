import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../interfaces/loader.interface';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private $loaderSubject = new Subject<LoaderState>();
  $loaderState = this.$loaderSubject.asObservable();
  constructor() { }
  // for show loader screen 
  showLoader() {
    this.$loaderSubject.next(<LoaderState>{ show: true });
    
  }

  // for hide loader screen 
  hideLoader() {
    this.$loaderSubject.next(<LoaderState>{ show: false });

  }
}
