import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-enlarge',
  templateUrl: './enlarge.component.html',
  styleUrls: ['./enlarge.component.scss'],
})
export class EnlargeComponent implements OnInit {

  list = [];
  constructor(private navv: NavParams) {
    console.log(this.navv.get("tags"));
    this.list = this.navv.get("tags");
   }

  ngOnInit() {}

}
