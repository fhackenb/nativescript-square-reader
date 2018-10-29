import { Observable } from "rxjs";

export declare enum CheckoutResultStatus {
    Succeeded = 0,
    Cancelled = 1,
    Failed = 2,
}
export declare class SquareCheckoutResult {
    status: CheckoutResultStatus;
    message: string;
    errorMessage?: string;
    errorCode?: string;
    checkoutResult?: any;
    constructor(status: any, message: any, errorMessage?: any, errorCode?: any, checkoutResult?: any);
}
export declare class SquareAuthStatus {
    code: number;
    message: string;
    constructor(code: any, message: any);
}
export declare class SquareReader extends NSObject {
    private locationManager;
    private checkoutSubscription;
    private checkoutSubscription$;
    constructor();
    private checkLocationPermissions();
    private checkMicrophonePermissions();
    private checkPermissions();
    authenticate(code: string): Promise<SquareAuthStatus>;
    checkoutControllerDidCancel(checkoutController): void;
    checkoutControllerDidFailWithError(checkoutController, error: NSError): void;
    checkoutControllerDidFinishCheckoutWithResult(checkoutController, result): void;
    startCheckout(amount: number, view: any, currencyCode?, allowedPaymentTypes?): Observable<any>;
}
