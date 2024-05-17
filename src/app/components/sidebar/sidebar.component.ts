import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { RouterLink } from '@angular/router';
import { ScrollPanelModule } from 'primeng/scrollpanel';

interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor,RouterLink,NgIf,NgClass,ScrollPanelModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {


  @Output() onToggleSideNav: EventEmitter<SideNavToggle>= new EventEmitter();
  collapsed=false;
  
  screenWidth=0;
  labelanterior="";
  navData=navbarData;

  toggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }

  closeCollapse():void{
    this.collapsed = false;
    this.navData.forEach(item=>item.submendesplegado=false);
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }

  toggleSubmenu(item: any) {
    item.submenuOpen = !item.submenuOpen;
}

desplegarSubmenu(label:string){
 
  const itemToUpdate = this.navData.find(item => item.label === label);
        if (itemToUpdate) {
          console.log(itemToUpdate);
            itemToUpdate.submendesplegado=!itemToUpdate.submendesplegado;
            console.log(itemToUpdate);
            console.log(this.navData);
        }
  
}

imprimirlabel(label:string){
  console.log("IMPRMENDO LABEL: "+label);
}

}
