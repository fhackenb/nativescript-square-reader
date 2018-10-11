import { Observable } from 'tns-core-modules/data/observable';
import { SquareReader } from 'nativescript-square-reader';
import { SquareAuthStatus } from '../../src/square-reader.ios';
import * as geolocation from "nativescript-geolocation";
import * as platform from "tns-core-modules/platform";

export class HelloWorldModel extends Observable {
  public message: string;
  private squareReader: SquareReader;
  // replace this with your square authoriation code (mobile auth api)
  private code: string = "sq0acp-WG5cfF7AWRA8uSLM5kaC5MyqBCUuwlNsEwSAP52tqwE";

  constructor() {
    super();
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
    this.authorizeLocation()
      .then( res => {
        // proceed with square
        // console.log("Location:", res);
        this.squareReader = new SquareReader();
        this.message = this.squareReader.message;
        setTimeout( () => {
          console.log("Square reader {N}:", this.squareReader);
          this.squareReader.authenticate(this.code)
            .then( (res: SquareAuthStatus) => {
              console.log("Status:", res);
              alert("Status:" + res.code);
            })
            .catch( (err) => {
              console.log("Auth error:", err);
              alert("Status:" + err.code);
            });
        }, 5000);
      })
      .catch( err => {
        console.log("Erorr in location access:", err);
        alert("Status:" + err.code);
      })
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
