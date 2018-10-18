import { Observable, Subject } from "rxjs";
import { SquareAuthStatus, SquareCheckoutResult, CheckoutResultStatus } from './square-reader.common';

// main implementation
@ObjCClass(SQRDCheckoutControllerDelegate)
export class SquareReader extends NSObject implements SQRDCheckoutControllerDelegate {

	private locationManager;
	private checkoutSubscription: Subject<SquareCheckoutResult>;
	private checkoutSubscription$: Observable<SquareCheckoutResult>;

	constructor() {
		super();
	}

	private checkLocationPermissions(): boolean {
		let isLocationAllowed: boolean = false;
		let locationStatus = CLLocationManager.authorizationStatus();
		switch  (locationStatus) {
			case CLAuthorizationStatus.kCLAuthorizationStatusNotDetermined:
				break;
			case CLAuthorizationStatus.kCLAuthorizationStatusRestricted, CLAuthorizationStatus.kCLAuthorizationStatusDenied:
				break;
			case CLAuthorizationStatus.kCLAuthorizationStatusAuthorized, CLAuthorizationStatus.kCLAuthorizationStatusAuthorizedAlways, CLAuthorizationStatus.kCLAuthorizationStatusAuthorizedWhenInUse:
				isLocationAllowed = true;
				break;
		}
		return isLocationAllowed;
	}

	private checkMicrophonePermissions(): Promise<boolean> {
		return new Promise( (resolve, reject) => {
			AVAudioSession.sharedInstance().requestRecordPermission( (authorized: boolean) => {
				resolve(authorized);
			});
		});
	}

	// square reader requires microphone, location permissions
	private checkPermissions(): Promise<SquareAuthStatus> {
		return new Promise( (resolve, reject) => {
			let isLocationAuthorized = this.checkLocationPermissions();
			if (!isLocationAuthorized) {
				reject( new SquareAuthStatus(1, "Location permissions not enabled"));
			}
			this.checkMicrophonePermissions()
				.then( (isMicrophoneAuthorized: boolean) => {
					if (isMicrophoneAuthorized) {
						resolve( new SquareAuthStatus(0, "All permissions authorized"));
					} else {
						reject( new SquareAuthStatus(2, "Microphone permissions are not enabled"));
					}
				});
		});
	}

	public authenticate(code: string): Promise<SquareAuthStatus> {
		return new Promise( (resolve, reject) => {
			this.checkPermissions()
				.then( res => {
					SQRDReaderSDK.initializeWithApplicationLaunchOptions(null);
					let isSquareAuthorized = SQRDReaderSDK.sharedSDK.isAuthorized;
					if (!isSquareAuthorized) {
						let authRes = SQRDReaderSDK.sharedSDK.authorizeWithCodeCompletionHandler(code, (location: SQRDLocation, error: NSError) => {
							if (location && !error) {
								resolve(new SquareAuthStatus(0, JSON.stringify(location)));
							} else {
								reject(new SquareAuthStatus(5, "Square Auth error: " + error));
							}
						});
					} else {
						resolve(new SquareAuthStatus(0, {}));
					}
				})
				.catch( err => {
					reject(err);
				})
		});
	}

	checkoutControllerDidCancel(checkoutController: SQRDCheckoutController) {
		const cancelledRes = new SquareCheckoutResult(CheckoutResultStatus.Cancelled, "Cancelled");
		this.checkoutSubscription.next(cancelledRes);
	}

	checkoutControllerDidFailWithError(checkoutController: SQRDCheckoutController, error: NSError) {
		let errorCode = error.code;
		let errorMessage = "";
		switch (error.code) {
			case SQRDReaderSettingsControllerError.SDKNotAuthorized:
				errorMessage = "Reader SDK is not authorized";
				break;
			case SQRDReaderSettingsControllerError.UsageError:
				errorMessage = "Usage Error";
				if (error.userInfo && error.userInfo.debugDescription) {
					errorMessage += ": " + error.userInfo.debugDescription;
				}
				break;
		}
		const errorRes = new SquareCheckoutResult(CheckoutResultStatus.Failed, "Failed", errorMessage, errorCode);
		this.checkoutSubscription.next(errorRes);
	}

	checkoutControllerDidFinishCheckoutWithResult(checkoutController: SQRDCheckoutController, result: SQRDCheckoutResult) {
		const successRes = new SquareCheckoutResult(CheckoutResultStatus.Succeeded, "Success", null, null, result);
		this.checkoutSubscription.next(successRes);
	}

	public startCheckout(amount: number, view, currencyCode: SQRDCurrencyCode = SQRDCurrencyCode.USD, allowedPaymentTypes: SQRDAdditionalPaymentTypes = 7): Observable<SquareCheckoutResult> {
		let amountMoney = new SQRDMoney({ amount, currencyCode});
		let params = new SQRDCheckoutParameters({ amountMoney });
		params.additionalPaymentTypes = allowedPaymentTypes;
		let checkoutController: SQRDCheckoutController = new SQRDCheckoutController({ parameters: params, delegate: this});
		checkoutController.presentFromViewController(view);
		this.checkoutSubscription  = new Subject<SquareCheckoutResult>();
		this.checkoutSubscription$ = this.checkoutSubscription.asObservable();
		return this.checkoutSubscription$;
	}
}