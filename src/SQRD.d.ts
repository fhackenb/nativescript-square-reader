declare const enum SQRDAdditionalPaymentTypes {

	ManualCardEntry = 1,

	Cash = 2,

	Other = 4
}

declare const enum SQRDAuthorizationError {

	UsageError = 1,

	NoNetworkConnection = 2
}

declare var SQRDAuthorizationErrorDomain: string;

declare class SQRDCard extends NSObject implements NSCopying {

	static alloc(): SQRDCard; // inherited from NSObject

	static new(): SQRDCard; // inherited from NSObject

	readonly brand: SQRDCardBrand;

	readonly lastFourDigits: string;

	constructor(o: { brand: SQRDCardBrand; lastFour: string; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithBrandLastFour(cardBrand: SQRDCardBrand, lastFour: string): this;

	isEqual(object: SQRDCard): boolean;
}

declare const enum SQRDCardBrand {

	OtherBrand = 0,

	Visa = 1,

	Mastercard = 2,

	Discover = 3,

	AmericanExpress = 4,

	DiscoverDiners = 5,

	Interac = 6,

	JCB = 7,

	ChinaUnionPay = 8,

	SquareGiftCard = 9
}

declare class SQRDCheckoutController extends NSObject {

	static alloc(): SQRDCheckoutController; // inherited from NSObject

	static new(): SQRDCheckoutController; // inherited from NSObject

	constructor(o: { parameters: SQRDCheckoutParameters; delegate: SQRDCheckoutControllerDelegate; });

	initWithParametersDelegate(parameters: SQRDCheckoutParameters, delegate: SQRDCheckoutControllerDelegate): this;

	presentFromViewController(viewController: UIViewController): void;
}

interface SQRDCheckoutControllerDelegate extends NSObjectProtocol {

	checkoutControllerDidCancel(checkoutController: SQRDCheckoutController): void;

	checkoutControllerDidFailWithError(checkoutController: SQRDCheckoutController, error: NSError): void;

	checkoutControllerDidFinishCheckoutWithResult(checkoutController: SQRDCheckoutController, result: SQRDCheckoutResult): void;
}
declare var SQRDCheckoutControllerDelegate: {

	prototype: SQRDCheckoutControllerDelegate;
};

declare const enum SQRDCheckoutControllerError {

	UsageError = 1,

	SDKNotAuthorized = 2
}

declare var SQRDCheckoutControllerErrorDomain: string;

declare class SQRDCheckoutParameters extends NSObject implements NSCopying {

	static alloc(): SQRDCheckoutParameters; // inherited from NSObject

	static new(): SQRDCheckoutParameters; // inherited from NSObject

	additionalPaymentTypes: SQRDAdditionalPaymentTypes;

	allowSplitTender: boolean;

	alwaysRequireSignature: boolean;

	readonly amountMoney: SQRDMoney;

	note: string;

	skipReceipt: boolean;

	tipSettings: SQRDTipSettings;

	constructor(o: { amountMoney: SQRDMoney; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithAmountMoney(amountMoney: SQRDMoney): this;
}

declare class SQRDCheckoutResult extends NSObject implements NSCopying {

	static alloc(): SQRDCheckoutResult; // inherited from NSObject

	static new(): SQRDCheckoutResult; // inherited from NSObject

	readonly createdAt: Date;

	readonly locationID: string;

	readonly tenders: NSSet<SQRDTender>;

	readonly totalMoney: SQRDMoney;

	readonly totalTipMoney: SQRDMoney;

	readonly transactionClientID: string;

	readonly transactionID: string;

	constructor(o: { transactionID: string; transactionClientID: string; locationID: string; createdAt: Date; tenders: NSArray<SQRDTender>; totalMoney: SQRDMoney; totalTipMoney: SQRDMoney; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithTransactionIDTransactionClientIDLocationIDCreatedAtTendersTotalMoneyTotalTipMoney(transactionID: string, transactionClientID: string, locationID: string, createdAt: Date, tenders: NSArray<SQRDTender>, totalMoney: SQRDMoney, totalTipMoney: SQRDMoney): this;

	isEqual(object: SQRDCheckoutResult): boolean;
}

declare const enum SQRDCurrencyCode {

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

declare function SQRDCurrencyCodeGetISOCurrencyCode(currencyCode: SQRDCurrencyCode): string;

declare function SQRDCurrencyCodeMake(ISOCurrencyCode: string): SQRDCurrencyCode;

declare const enum SQRDDeauthorizationError {

	UsageError = 1
}

declare var SQRDDeauthorizationErrorDomain: string;

declare var SQRDErrorDebugCodeKey: string;

declare var SQRDErrorDebugMessageKey: string;

declare class SQRDLocation extends NSObject implements NSCopying {

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

declare class SQRDMoney extends NSObject implements NSCopying {

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

declare class SQRDReaderSDK extends NSObject {

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

declare class SQRDReaderSettingsController extends NSObject {

	static alloc(): SQRDReaderSettingsController; // inherited from NSObject

	static new(): SQRDReaderSettingsController; // inherited from NSObject

	constructor(o: { delegate: SQRDReaderSettingsControllerDelegate; });

	initWithDelegate(delegate: SQRDReaderSettingsControllerDelegate): this;

	presentFromViewController(viewController: UIViewController): void;
}

interface SQRDReaderSettingsControllerDelegate {

	readerSettingsControllerDidFailToPresentWithError(readerSettingsController: SQRDReaderSettingsController, error: NSError): void;

	readerSettingsControllerDidPresent(readerSettingsController: SQRDReaderSettingsController): void;
}
declare var SQRDReaderSettingsControllerDelegate: {

	prototype: SQRDReaderSettingsControllerDelegate;
};

declare const enum SQRDReaderSettingsControllerError {

	UsageError = 1,

	SDKNotAuthorized = 2
}

declare var SQRDReaderSettingsControllerErrorDomain: string;

declare class SQRDTender extends NSObject implements NSCopying {

	static alloc(): SQRDTender; // inherited from NSObject

	static new(): SQRDTender; // inherited from NSObject

	readonly cardDetails: SQRDTenderCardDetails;

	readonly cashDetails: SQRDTenderCashDetails;

	readonly createdAt: Date;

	readonly tenderID: string;

	readonly tipMoney: SQRDMoney;

	readonly totalMoney: SQRDMoney;

	readonly type: SQRDTenderType;

	constructor(o: { clientID: string; createdAt: Date; totalMoney: SQRDMoney; tipMoney: SQRDMoney; type: SQRDTenderType; serverID: string; cardDetails: SQRDTenderCardDetails; cashDetails: SQRDTenderCashDetails; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithClientIDCreatedAtTotalMoneyTipMoneyTypeServerIDCardDetailsCashDetails(clientID: string, createdAt: Date, totalMoney: SQRDMoney, tipMoney: SQRDMoney, type: SQRDTenderType, serverID: string, cardDetails: SQRDTenderCardDetails, cashDetails: SQRDTenderCashDetails): this;

	isEqual(object: SQRDTender): boolean;
}

declare class SQRDTenderCardDetails extends NSObject implements NSCopying {

	static alloc(): SQRDTenderCardDetails; // inherited from NSObject

	static new(): SQRDTenderCardDetails; // inherited from NSObject

	readonly card: SQRDCard;

	readonly entryMethod: SQRDTenderCardDetailsEntryMethod;

	constructor(o: { card: SQRDCard; entryMethod: SQRDTenderCardDetailsEntryMethod; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithCardEntryMethod(card: SQRDCard, entryMethod: SQRDTenderCardDetailsEntryMethod): this;

	isEqual(object: SQRDTenderCardDetails): boolean;
}

declare const enum SQRDTenderCardDetailsEntryMethod {

	Unknown = 0,

	Swipe = 1,

	Chip = 2,

	Contactless = 3,

	ManuallyEntered = 4
}

declare class SQRDTenderCashDetails extends NSObject implements NSCopying {

	static alloc(): SQRDTenderCashDetails; // inherited from NSObject

	static new(): SQRDTenderCashDetails; // inherited from NSObject

	readonly buyerTenderedMoney: SQRDMoney;

	readonly changeBackMoney: SQRDMoney;

	constructor(o: { buyerTenderedMoney: SQRDMoney; changeBackMoney: SQRDMoney; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithBuyerTenderedMoneyChangeBackMoney(buyerTenderedMoney: SQRDMoney, changeBackMoney: SQRDMoney): this;

	isEqual(object: SQRDTenderCashDetails): boolean;
}

declare const enum SQRDTenderType {

	Other = 0,

	Card = 1,

	Cash = 2
}

declare class SQRDTipSettings extends NSObject implements NSCopying {

	static alloc(): SQRDTipSettings; // inherited from NSObject

	static new(): SQRDTipSettings; // inherited from NSObject

	showCustomTipField: boolean;

	showSeparateTipScreen: boolean;

	tipPercentages: NSArray<number>;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	isEqual(object: SQRDTipSettings): boolean;
}
