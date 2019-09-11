# NativeScript Square Reader

iOS only (for now) nativescript plugin for the Square Reader SDK https://squareup.com/us/en/developers/reader-sdk

Note: will only work for iOS 11+. To support older versions, consider using 
https://github.com/fhackenb/nativescript-square-plugin

## Installation


`tns plugin add nativescript-square-reader`

## Setup

iOS setup guide: https://docs.connect.squareup.com/payments/readersdk/setup-ios

1. `tns plugin add nativescript-square-reader`
2. Follow steps 1 - 2 on the above list to get a SquareReaderSDK.framework
3. Add the SquareReaderSDK.framework to your build path
4. Update your Info.plist with usage descriptions (Step 3 from link)
5. Get an auth code https://docs.connect.squareup.com/payments/readersdk/mobile-authz-guide
6. Get coding!


## Usage 
See demo app for more detailed example usage 

Authenticate:
```
this.squareReader = new SquareReader();
this.squareReader.authenticate(this.code)
    .then( (res: SquareAuthStatus) => {
        if (res.code === 0) {
            // authenticated
        } else {
            // not authenticated
        }
    });
```

Check out:
```
this.squareReader.startCheckout(100, this.page.ios)
    .subscribe( (result: SquareCheckoutResult) => {
        switch (result.status) {
            case 1:
            	console.log("Cancelled!");
            	break;
            case 2:
            	console.log("Failed!");
            	break;
            case 0:
            	console.log("Succeeded!");
            	console.log("LocationId:", result.checkoutResult.locationID);
            	console.log("Tenders:", result.checkoutResult.tenders);
            break;
        }
    });
```

## Integrating w/ Square Stand

Add the following permissions to your Info.plist:

```
<key>UISupportedExternalAccessoryProtocols</key>
	<array>
		<string>com.squareup.s020</string>
		<string>com.squareup.s025</string>
		<string>com.squareup.s089</string>
	</array>
 ```



## License

Apache License Version 2.0, January 2004


./gradlew jar
 java -jar build/libs/dts-generator.jar -input /Users/frank/Documents/RacknerProjects/FunFangle/plugins/nativescript-square-reader/demo/platforms/android
