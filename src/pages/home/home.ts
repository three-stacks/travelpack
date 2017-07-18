import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Packs } from "../packs/packs";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  public user = { username: "", password: ""};

  constructor(public navCtrl: NavController, public authSvs: AuthService) {
  }

  public login() {
    console.log(this.user, "in home page");
    this.authSvs.loginUser(this.user);
    this.navCtrl.push(Packs);
  }

  public signup() {
    this.authSvs.signupUser(this.user);
    this.navCtrl.push(Packs);
  }

}
