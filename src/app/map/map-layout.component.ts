import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'flex-map',
  templateUrl: './map-layout.component.html',
  styleUrls:['./map-style.css']
})
export class MapLayoutComponent implements OnInit {

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {}
}
