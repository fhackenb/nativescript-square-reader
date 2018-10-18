import { Observable } from 'tns-core-modules/data/observable';
export declare class SquareAuthStatus {
    code: number;
    message: string;
    constructor(code: any, message: any);
}
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
export declare class Common extends Observable {
    constructor();
    authenticate(code: string): Promise<any>;
    startCheckout(amount: any, view: any, currencyCode?: any, allowedPaymentTypes?: any): void;
}
