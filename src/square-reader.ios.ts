
export class SquareAuthStatus {
	code: number;
	message: string;

	constructor(code, message) {
		this.code = code;
		this.message = message;
	}
}


// main implementation
@ObjCClass(SQRDCheckoutControllerDelegate)
export class SquareReader extends NSObject implements SQRDCheckoutControllerDelegate {

	private locationManager;
	private paymentTypes = SQRDAdditionalPaymentTypes.Cash;
	static OBJCProtocols = [SQRDCheckoutControllerDelegate];

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

	// some square features require microphone, location permissions
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
			console.log("SDK:", SQRDReaderSDK);
			this.checkPermissions()
				.then( res => {
					SQRDReaderSDK.initializeWithApplicationLaunchOptions(null);
					let isSquareAuthorized = SQRDReaderSDK.sharedSDK.isAuthorized;
					if (!isSquareAuthorized) {
						let authRes = SQRDReaderSDK.sharedSDK.authorizeWithCodeCompletionHandler(code, (location: SQRDLocation, error: NSError) => {
							if (location && !error) {
								resolve(new SquareAuthStatus(0, JSON.stringify(location)));
							} else {
								console.log("Error:", error);
								reject(new SquareAuthStatus(5, "Square Auth error: " + error));
							}
						});
					} else {
						resolve(new SquareAuthStatus(0, {}));
					}
				})
				.catch( err => {
					console.log("Permissions denied:", err);
					reject(err);
				})
		});
	}

	checkoutControllerDidCancel(checkoutController: SQRDCheckoutController) {
		console.log("cancelled. Controller:", checkoutController);
	}

	checkoutControllerDidFailWithError(checkoutController: SQRDCheckoutController, error: NSError) {
		console.log("Failed. Controller:", checkoutController);
		console.log("Error:", error);
	}

	checkoutControllerDidFinishCheckoutWithResult(checkoutController: SQRDCheckoutController, result: SQRDCheckoutResult) {
		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		console.log("Finished with result:", result);
	}

	public startCheckout(amount: number, view, currencyCode: SQRDCurrencyCode = SQRDCurrencyCode.USD, allowedPaymentTypes: SQRDAdditionalPaymentTypes = this.paymentTypes) {
		let amountMoney = new SQRDMoney({ amount, currencyCode});
		console.log("Amount money:", amountMoney);
		let params = new SQRDCheckoutParameters({ amountMoney });
		console.log("Params:", params);
		params.additionalPaymentTypes = allowedPaymentTypes;
		console.log("Set additional params");
		let checkoutController: SQRDCheckoutController = new SQRDCheckoutController({ parameters: params, delegate: this});
		console.log("Create checkout controller...");
		checkoutController.initWithParametersDelegate(params, this);
		console.log("Initialized checkout controller");
		checkoutController.presentFromViewController(view);

	}
}