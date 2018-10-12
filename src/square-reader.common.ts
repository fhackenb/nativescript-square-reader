import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';

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