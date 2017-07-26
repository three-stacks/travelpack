import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Packs } from "../packs/packs";
import { AuthService } from "../../services/auth.service";
import { Storage } from "@ionic/storage";
import { Signup } from "../signup/signup";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  public user: any = { username: "", password: "", strategy: "local"};

  constructor(private storage: Storage, public navCtrl: NavController, public authSvs: AuthService) {
  }

  public tokenAuth(token) {
    if (token) {
      this.navCtrl.push(Packs);
    }
  }
  
  public login() {
    this.authSvs.loginUser(this.user, this.tokenAuth.bind(this));
  }

  public signup() {
    this.navCtrl.push(Signup);
  }

}
