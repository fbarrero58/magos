import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.checkFullPageBackgroundImage()
  }

  checkFullPageBackgroundImage(){
    let page = $('.full-page');
    let image_src = page.data('image');

    if (image_src !== undefined) {
        let image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
        page.append(image_container);
    }

    setTimeout(function() {
      $('.card').removeClass('card-hidden');
    }, 700);

  }

}
