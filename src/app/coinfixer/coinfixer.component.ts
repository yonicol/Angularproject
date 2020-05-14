import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-coinfixer',
  templateUrl: './coinfixer.component.html',
  styleUrls: ['./coinfixer.component.css']
})
export class CoinfixerComponent implements OnInit {

  constructor(private router: Router, private apiconnect: HttpClient) { }
  coinsrates;
  ngOnInit(): void {
    this.getcoinsRates()
  }
  getcoinsRates() {
    let data = this.apiconnect.get("http://data.fixer.io/api/latest?access_key=92632f3462219556c9224bc2f21cf175");
    data.subscribe(ele =>{this.coinsrates = ele
    console.log(this.coinsrates);
    });
  }
}
