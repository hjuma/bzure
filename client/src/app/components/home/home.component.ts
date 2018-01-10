import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetService } from '../../core/services/asset.service';
import { Asset } from '../../core/models/asset';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-250px, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideContent', [
      state('in', style({
        transform: 'translate3d(250px, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  private routerSub: any;

  menuState = 'out';

  constructor(private router: Router) {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuState = 'out';
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }


}
