import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';


@Injectable()

export class YelpService {
  public headers = new Headers({ 'Content-Type': 'application/json',
  'Authorization': 'Bearer THJYyJORXl0mdxDKw8GcPqKU5dHHYWRP70WX33mO-S_TNYs5iq7pjZHYy4oP4yX0LgwcV0JeXmljRIhiq-X_iBRA5rJDbPESvqeeifbcJTo90GdmcEC4JjimQP9oWXYx'
});

constructor(public http: Http){}

  public fetchYelpData(searchQuery){
    console.log(searchQuery,'search query');
    console.log(this.headers, 'headers')
    // this.http.get('https://api.yelp.com/v3/businesses/search', searchQuery)
      // .map(res => res.json())
      // .subscribe(response) => {
      //   console.log(response);
      // }, error => {
      //   console.error(error);
      // }); 
  }


}