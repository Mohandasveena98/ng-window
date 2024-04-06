import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { NgWindowComponent } from '../projects/ng-window/src/lib/ng-window.component';
// import {NgWindowComponent} from '/ng-window'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgWindowComponent],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <button (click)="ngWin.start()">Open</button>
    <ng-window #ngWin [title]="'my title'" [titleClr]="'color:yellow'" [titleBar]="'background:red;'" [btn1]="'color:green;'" [btn2]="'color:white;'" [btn3]="'color:orange;'" [content]="'background:pink;'">
      <h1>hello</h1>
      <p>myb page</p>
    </ng-window>
  `,
})
export class App implements AfterViewInit {
  @ViewChild(NgWindowComponent) _ngWin!: NgWindowComponent;

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  name = 'Angular';
}

bootstrapApplication(App);
