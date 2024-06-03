import { Component, OnInit } from '@angular/core';
import { MENU_DATA, MenuType } from 'src/app/shared/menu-data';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menu: MenuType = MENU_DATA;

  constructor() { }

  ngOnInit() {
  }

}
