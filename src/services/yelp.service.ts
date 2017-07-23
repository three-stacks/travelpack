import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';


@Injectable()

export class YelpService {
  public header = new Headers(
  { 
  'Access-Control-Allow-Origin': 'http://localhost:8100',  
  'Content-Type' :'application/x-www-form-urlencoded',
  'Authorization': 'Bearer THJYyJORXl0mdxDKw8GcPqKU5dHHYWRP70WX33mO-S_TNYs5iq7pjZHYy4oP4yX0LgwcV0JeXmljRIhiq-X_iBRA5rJDbPESvqeeifbcJTo90GdmcEC4JjimQP9oWXYx'
  });

constructor(public http: Http){}
  
  public g_options = new RequestOptions({
    headers: this.header
  })

  public fetchYelpData(searchQuery){
    console.log(searchQuery,'search query')
        console.log(this.header, 'headers')
    this.http.get(`https://api.yelp.com/v3/businesses/search`, this.header )
      .map((res) => res.json())
      .subscribe((response) => {
        console.log(response, 'yelp results');
      }, error => {
        console.error(error);
      }); 
  }
    
}
