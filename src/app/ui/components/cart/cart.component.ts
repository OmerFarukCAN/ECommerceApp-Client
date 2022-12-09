import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerState } from 'src/app/base/base.component';
import { NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService){
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerState.Pacman)
  }
}
