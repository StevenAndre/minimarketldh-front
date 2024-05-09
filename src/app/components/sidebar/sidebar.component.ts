import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { RouterLink } from '@angular/router';


interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor,RouterLink,NgIf,NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {


  @Output() onToggleSideNav: EventEmitter<SideNavToggle>= new EventEmitter();
  collapsed=false;
  screenWidth=0;
  navData=navbarData;

  toggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }

  closeCollapse():void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }


}