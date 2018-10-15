// import * as application from 'tns-core-modules/application';
// application.start({ moduleName: "main-page" });

import { SquareReader } from 'nativescript-square-reader';
import { SquareAuthStatus } from '../../src/square-reader.ios';
import * as platform from "tns-core-modules/platform";
import * as geolocation from "nativescript-geolocation";

var RootViewController = UIViewController.extend({

    label: UILabel,
    code: String,

    viewDidLoad() {
        console.log("View loaded!");
        UIViewController.prototype.viewDidLoad.apply(this, arguments);

        this.label = new UILabel(CGRectMake(0, 0, 250, 60));
        this.label.text = "Hello, World!";

        this.label.center = this.view.center;
        this.label.textAlignment = NSTextAlignment.NSTextAlignmentCenter;

        this.view.addSubview(this.label);
        this.code = "sq0acp-LuFhqIn_4WxDndY3en9DLeNC1tF8OMCKa_mULHSca0U";
        this.initialize();
    },

    initialize() {
        console.log("Auth square!");
        if (platform.isIOS) {
            let device = platform.device;
            let majorVersion = parseInt(device.osVersion.split(".")[0]);
            console.log("Device:", device);
            console.log("isIOS!");
            console.log("device.osCVersion:", majorVersion);
            if (majorVersion >= 11) {
              this.authenticateSquare();
            } else {
              alert("Do not load on older version of iOS!");
            }
          }
    },

    authenticateSquare() {
        console.log("Authenticate square!");
        this.authorizeLocation()
        .then( res => {
            // proceed with square
            this.squareReader = new SquareReader();
            console.log("Square reader {N}:", this.squareReader);
            this.squareReader.authenticate(this.code)
            .then( (res: SquareAuthStatus) => {
                console.log("Status:", res);
                
                if (res.code === 0) {
                    console.log("It is authenticated!");
                    this.isSquareAuthenticated = true;
                    this.label.text = "Auth succeeded!";
                    // alert("Square Authenticated!");
                    //setTimeout( () => {
                        console.log("Post timeout!");
                        console.log(this.squareReader);
                        this.checkout();
                    // }, 5000);
                } else {
                    console.log("It is not authenticated!");
                    this.label.text = "Auth failed!";
                    alert("Not Authenticated? Status:" + res.code);
                }
            })
            .catch( (err) => {
                console.log("Auth error:", err);
                alert("Auth error status:" + err.code);
            });
        })
        .catch( err => {
            console.log("Erorr in location access:", err);
            alert("Location error:" + err.code);
        })
    },

    checkout() {
        console.log("Attempt checkout");
        // if (!this.isSquareAuthenticated) {
        //   return alert("Not authenticated!");
        // }
        console.log("This:", this);
        this.squareReader.startCheckout(100, this);
    },
    

    authorizeLocation(): Promise<any> {
        console.log("Authorize location"); 
        return Promise.resolve(true);
        // return new Promise( (resolve, reject) => {
        //   geolocation.enableLocationRequest()
        //     .then( res => {
        //       geolocation.getCurrentLocation({})
        //         .then( res => {
        //           resolve(res);
        //         })
        //         .catch( err => {
        //           reject(err);
        //         });
        //     })
        //     .catch(err => {
        //       reject(err);
        //     })
        // })
      }
});

var AppDelegate = UIResponder.extend({
    applicationDidFinishLaunchingWithOptions(application, launchOptions) {
        this._window = new UIWindow(UIScreen.mainScreen.bounds);
        this._window.backgroundColor = UIColor.whiteColor;
        this._window.rootViewController = new RootViewController();
        this._window.makeKeyAndVisible();
        return true;
    }
}, {
    protocols: [UIApplicationDelegate]
});



UIApplicationMain(0, null, null, NSStringFromClass(AppDelegate.class()));