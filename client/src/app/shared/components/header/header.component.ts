import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() public isLoggedin!: boolean | null;
  @Output() public logout: EventEmitter<true> = new EventEmitter()

  constructor() {}

  ngOnInit() {}
}
