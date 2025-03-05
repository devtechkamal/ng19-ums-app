import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedConfModule } from '../../shared/shared-conf.module';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { Drawer } from 'primeng/drawer';
import { StyleClass } from 'primeng/styleclass';

@Component({
  selector: 'app-navbar',
  imports: [SharedConfModule, RouterLink, StyleClass],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  menus: MenuItem[] | undefined;
  visible: boolean = false;
  appName: string = 'User Management';
  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: Event): void {
    this.drawerRef.close(e);
  }

  ngOnInit() {}
}
