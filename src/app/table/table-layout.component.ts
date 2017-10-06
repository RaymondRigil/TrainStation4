import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'flex-table',
  templateUrl: './table-layout.component.html',
  styleUrls:['./table-style.css']
})
export class TableLayoutComponent implements OnInit {

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
