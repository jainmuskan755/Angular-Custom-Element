import { Component, OnInit, OnDestroy, DoCheck, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from '../../interfaces/loader.interface';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  show = false;
  private subscription: Subscription;

  constructor(
    private _loaderService:LoaderService) { }

  ngOnInit() {
    this.subscription = this._loaderService.$loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        console.log("Loader status:",this.show)
      },
      err=>{
        // console.log("11111111111111",err)
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
