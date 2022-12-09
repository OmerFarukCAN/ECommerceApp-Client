import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner(spinnerNameState: SpinnerState) {
    this.spinner.show(spinnerNameState);

    setTimeout(() => this.hideSpinner(spinnerNameState), 500);
  }

  hideSpinner(spinnerNameState: SpinnerState) {
    this.spinner.hide(spinnerNameState);
  }
}

export enum SpinnerState {
  BallSpin = 's1',
  Pacman = 's2',
  BallScale = 's3',
}
