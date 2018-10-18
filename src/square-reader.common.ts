import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';


export class SquareAuthStatus {
	code: number;
	message: string;

	constructor(code, message) {
		this.code = code;
		this.message = message;
	}
}

export enum CheckoutResultStatus {
  Succeeded = 0,
  Cancelled = 1,
  Failed = 2
}

export class SquareCheckoutResult {
  status: CheckoutResultStatus;
  message: string;
  errorMessage?: string;
  errorCode?: string;
  checkoutResult?: any;

  constructor(status, message, errorMessage?, errorCode?, checkoutResult?) {
    this.status = status;
    this.message = message;
    this.errorMessage = errorMessage? errorMessage : "";
    this.errorCode = errorCode? errorCode : null;
    this.checkoutResult = checkoutResult? checkoutResult : null;
  }
}


export class Common extends Observable {

  constructor() {
    super();
  }

  public authenticate(code: string): Promise<any> {
    console.log("Generic authenticate");
    return Promise.resolve({code: 500, message: "generic implementation"});
  }

  public startCheckout(amount, view, currencyCode?, allowedPaymentTypes?) {

  }
  
}