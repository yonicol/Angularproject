import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-guestarea',
  templateUrl: './guestarea.component.html',
  styleUrls: ['./guestarea.component.css']
})
export class GuestareaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  login():void{
    this.router.navigate(['/login']);
  }
}
