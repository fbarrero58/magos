import { Component, OnInit } from '@angular/core';
import { Login } from '../classes/login';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  myLogin = new Login('pos000','Martin1994');
  submitted: boolean = false;

  constructor() { }

  ngOnInit() {
    this.checkFullPageBackgroundImage();
  }

  checkFullPageBackgroundImage(){
    let page = $('.full-page');
    let image_src = page.data('image');

    if (image_src !== undefined) {
        let   image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
        page.append(image_container);
    }

    setTimeout(function() {
      $('.card').removeClass('card-hidden');
    }, 700);

  }

  onSubmit(e){
    console.log(e);
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 3000);
    return JSON.stringify(this.myLogin);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.myLogin); }

}
