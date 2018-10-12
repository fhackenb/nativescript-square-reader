import { Observable } from 'tns-core-modules/data/observable';
import { SquareReader } from 'nativescript-square-reader';
import { SquareAuthStatus } from '../../src/square-reader.ios';
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import * as geolocation from "nativescript-geolocation";
import * as platform from "tns-core-modules/platform";

export class HelloWorldModel extends UIViewController {
  public isSquareAuthenticated: boolean = false;
  private squareReader: SquareReader;
  // replace this with your square authoriation code (mobile auth api)
  private code: string = "sq0acp-VZNQYm4zTSS1IJE6GUEazMxpXLHpvG3SulCF_MogcpU";


  constructor() {
    super(null);
    console.log("Constructed...");
  }

  public viewDidLoad() {
    super.viewDidLoad();
    console.log("View did load!");
  }

  private initialize() {
    
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
  }

  private authenticateSquare() {
    this.authorizeLocation()
      .then( res => {
        // proceed with square
        this.squareReader = new SquareReader();
        console.log("Square reader {N}:", this.squareReader);
        this.squareReader.authenticate(this.code)
          .then( (res: SquareAuthStatus) => {
            console.log("Status:", res);
            
            if (res.code === 0) {
              this.isSquareAuthenticated = true;
              alert("Square Authenticated!");
            } else {
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
  }

  public checkout() {
    console.log("Attempt checkout");
    if (!this.isSquareAuthenticated) {
      return alert("Not authenticated!");
    }
    this.squareReader.startCheckout(100, this);
  }


  private authorizeLocation(): Promise<any> { 
    return new Promise( (resolve, reject) => {
      geolocation.enableLocationRequest()
        .then( res => {
          geolocation.getCurrentLocation({})
            .then( res => {
              resolve(res);
            })
            .catch( err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        })
    })
  }



}
