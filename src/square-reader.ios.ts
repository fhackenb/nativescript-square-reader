import { Common } from './square-reader.common';

export declare class SQRDReaderSDK extends NSObject {
	static alloc(): SQRDReaderSDK; // inherited from NSObject
	static initializeWithApplicationLaunchOptions(launchOptions: NSDictionary<string, any>): void;
	static new(): SQRDReaderSDK; // inherited from NSObject
	readonly authorizedLocation: SQRDLocation;
	readonly canDeauthorize: boolean;
	readonly isAuthorizationInProgress: boolean;
	readonly isAuthorized: boolean;
	static readonly sharedSDK: SQRDReaderSDK;
	authorizeWithCodeCompletionHandler(code: string, completionHandler: (p1: SQRDLocation, p2: NSError) => void): void;
	deauthorizeWithCompletionHandler(completionHandler: (p1: NSError) => void): void;
}

export declare class SQRDLocation extends NSObject implements NSCopying {
	static alloc(): SQRDLocation; // inherited from NSObject
	static new(): SQRDLocation; // inherited from NSObject
	readonly businessName: string;
	readonly currencyCode: SQRDCurrencyCode;
	readonly isCardProcessingActivated: boolean;
	readonly locationID: string;
	readonly maximumCardPaymentAmountMoney: SQRDMoney;
	readonly minimumCardPaymentAmountMoney: SQRDMoney;
	readonly name: string;
	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
	isEqual(object: SQRDMoney): boolean;
}

export declare class SQRDMoney extends NSObject implements NSCopying {
	static alloc(): SQRDMoney; // inherited from NSObject
	static new(): SQRDMoney; // inherited from NSObject
	readonly amount: number;
	readonly currencyCode: SQRDCurrencyCode;
	constructor(o: { amount: number; });
	constructor(o: { amount: number; currencyCode: SQRDCurrencyCode; });
	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
	initWithAmount(amount: number): this;
	initWithAmountCurrencyCode(amount: number, currencyCode: SQRDCurrencyCode): this;
	isEqual(object: SQRDMoney): boolean;
}

export declare const enum SQRDCurrencyCode {
	Unknown = 0,
	Automatic = 4294967295,
	AED = 784,
	ALL = 8,
	AMD = 51,
	AOA = 973,
	ARS = 32,
	AUD = 36,
	AWG = 533,
	AZN = 944,
	BAM = 977,
	BBD = 52,
	BDT = 50,
	BGN = 975,
	BHD = 48,
	BMD = 60,
	BND = 96,
	BOB = 68,
	BRL = 986,
	BSD = 44,
	BTN = 64,
	BWP = 72,
	BYR = 974,
	BZD = 84,
	CAD = 124,
	CDF = 976,
	CHF = 756,
	CLP = 152,
	CNY = 156,
	COP = 170,
	CRC = 188,
	CVE = 132,
	CZK = 203,
	DKK = 208,
	DOP = 214,
	DZD = 12,
	EGP = 818,
	ETB = 230,
	EUR = 978,
	FJD = 242,
	GBP = 826,
	GEL = 981,
	GHS = 936,
	GIP = 292,
	GMD = 270,
	GTQ = 320,
	GYD = 328,
	HKD = 344,
	HNL = 340,
	HRK = 191,
	HTG = 332,
	HUF = 348,
	IDR = 360,
	ILS = 376,
	INR = 356,
	ISK = 352,
	JMD = 388,
	JOD = 400,
	JPY = 392,
	KES = 404,
	KGS = 417,
	KHR = 116,
	KRW = 410,
	KWD = 414,
	KYD = 136,
	KZT = 398,
	LAK = 418,
	LBP = 422,
	LKR = 144,
	LRD = 430,
	LTL = 440,
	MAD = 504,
	MDL = 498,
	MGA = 969,
	MKD = 807,
	MMK = 104,
	MNT = 496,
	MOP = 446,
	MRO = 478,
	MUR = 480,
	MWK = 454,
	MXN = 484,
	MYR = 458,
	MZN = 943,
	NAD = 516,
	NGN = 566,
	NIO = 558,
	NOK = 578,
	NPR = 524,
	NZD = 554,
	OMR = 512,
	PAB = 590,
	PEN = 604,
	PGK = 598,
	PHP = 608,
	PKR = 586,
	PLN = 985,
	PYG = 600,
	QAR = 634,
	RON = 946,
	RSD = 941,
	RUB = 643,
	RWF = 646,
	SAR = 682,
	SBD = 90,
	SCR = 690,
	SEK = 752,
	SGD = 702,
	SLL = 694,
	SRD = 968,
	STD = 678,
	SVC = 222,
	SZL = 748,
	THB = 764,
	TJS = 972,
	TMT = 934,
	TND = 788,
	TRY = 949,
	TTD = 780,
	TWD = 901,
	TZS = 834,
	UAH = 980,
	UGX = 800,
	USD = 840,
	UYU = 858,
	UZS = 860,
	VEF = 937,
	VND = 704,
	XAF = 950,
	XCD = 951,
	XOF = 952,
	YER = 886,
	ZAR = 710,
	ZMW = 967
}

export class SquareAuthStatus {
	code: number;
	message: string;

	constructor(code, message) {
		this.code = code;
		this.message = message;
	}
}


export class SquareReader extends Common {

	public message: string;
	private locationManager;

	constructor() {
		super();
		this.message = "iOS Square Reader SDK";
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
		});
	}
}
