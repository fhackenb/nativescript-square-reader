import { Observable } from "rxjs";
import { SquareAuthStatus, SquareCheckoutResult } from './square-reader.common';
export declare class SquareReader extends NSObject implements SQRDCheckoutControllerDelegate {
    private locationManager;
    private checkoutSubscription;
    private checkoutSubscription$;
    constructor();
    private checkLocationPermissions();
    private checkMicrophonePermissions();
    private checkPermissions();
    authenticate(code: string): Promise<SquareAuthStatus>;
    checkoutControllerDidCancel(checkoutController: SQRDCheckoutController): void;
    checkoutControllerDidFailWithError(checkoutController: SQRDCheckoutController, error: NSError): void;
    checkoutControllerDidFinishCheckoutWithResult(checkoutController: SQRDCheckoutController, result: SQRDCheckoutResult): void;
    startCheckout(amount: number, view: any, currencyCode?: SQRDCurrencyCode, allowedPaymentTypes?: SQRDAdditionalPaymentTypes): Observable<SquareCheckoutResult>;
}
