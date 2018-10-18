import { Observable } from 'tns-core-modules/data/observable';
import { SquareReader } from 'nativescript-square-reader';
import { SquareAuthStatus } from '../../src/square-reader.ios';
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import * as geolocation from "nativescript-geolocation";
import * as platform from "tns-core-modules/platform";
import { profile } from "tns-core-modules/profiling";
import { Page } from 'tns-core-modules/ui/page/page';

export class HelloWorldModel {
  public isSquareAuthenticated: boolean = false;
  public squareReader: SquareReader;
  public code: string = this.code = "sq0acp-9gn4PwxnKmhESbZrrcDwLuu8M1ZoBE_Z9PL5n0NoqOk";
  public page: Page;

  constructor(page: Page) { 
    this.page = page;
    this.initialize();
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
      // authenticate with square
      this.authorizeLocation()
      .then( res => {
        this.squareReader = new SquareReader();
        console.log("Square reader {N}:", this.squareReader);
        console.log("Prepare to authorize with code:", this.code);
        this.squareReader.authenticate(this.code)
          .then( (res: SquareAuthStatus) => {
            console.log("Status:", res);
            if (res.code === 0) {
              this.isSquareAuthenticated = true;
              alert("Square Authenticated!");
              // this.checkout();
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
    let uiVC = this.page.ios;
    console.log("This page controller:", uiVC);
    this.squareReader.startCheckout(100, uiVC);
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
