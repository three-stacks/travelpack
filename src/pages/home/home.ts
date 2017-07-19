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
  public user: any = { email: "", password: "", strategy: "local"};

  constructor(private storage: Storage, public navCtrl: NavController, public authSvs: AuthService) {
  }

  public login() {
    console.log(this.user, "in home page");
    this.authSvs.loginUser(this.user);
    // this.storage.set('user', this.user.username);
    this.navCtrl.push(Packs);
  }

  public signup() {
    // this.authSvs.signupUser(this.user);
    this.navCtrl.push(Signup);
  }

}
