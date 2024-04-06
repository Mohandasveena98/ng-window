import {
  Component,
  ViewChild,
  Renderer2,
  OnInit,
  OnDestroy,
  ElementRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'ng-window',
  standalone: true,
  templateUrl: './ng-window.component.html',
  styleUrl: './ng-window.component.css',
})
export class NgWindowComponent implements OnInit, OnDestroy {
  constructor(private renderer2: Renderer2) {}

  @Input()
  title!: string;
  @Input()
  titleClr!: string;
  @Input()
  titleBar!: string;
  @Input()
  btn1!: string;
  @Input()
  btn2!: string;
  @Input()
  btn3!: string;
  @Input()
  content!: string;

  @ViewChild('draggableEl', { static: true })
  draggableElRef!: ElementRef;

  @ViewChild('windowEl', { static: true })
  windowElRef!: ElementRef;

  @ViewChild('resizeEl', { static: true })
  resizeElRef!: ElementRef;

  @ViewChild('contentEl', { static: true })
  contentElRef!: ElementRef;

  private unlistenMouseDown!: () => void;
  private unlistenMouseMove!: () => void;
  private unlistenMouseUp!: () => void;

  private initDrag!: () => void;
  private doDrag!: () => void;
  private stopDrag!: () => void;

  getComputedStyle() {
    return window.getComputedStyle(this.contentElRef.nativeElement);
  }

  min() {
    //console.log('mini');
    const resizeEl = this.resizeElRef.nativeElement;
    const contentEl = this.contentElRef.nativeElement;
    const windowEl = this.windowElRef.nativeElement;
    windowEl.style.background = 'none';
    contentEl.style.display = 'none';
    resizeEl.style.display = 'none';
    windowEl.style.border = 'none';
  }
  max() {
    //console.log('mini');
    //const draggableEl = this.draggableElRef.nativeElement;
    const resizeEl = this.resizeElRef.nativeElement;
    const contentEl = this.contentElRef.nativeElement;
    const windowEl = this.windowElRef.nativeElement;
    windowEl.style.background = '#eee5e5';
    contentEl.style.display = 'block';
    resizeEl.style.display = 'block';
    windowEl.style.borderRadius = '8px';
  }
  close() {
    const draggableEl = this.draggableElRef.nativeElement;
    const windowEl = this.windowElRef.nativeElement;
    draggableEl.style.display = 'none';
    windowEl.style.display = 'none';
  }

  start() {
    //console.log('hi');
    const draggableEl = this.draggableElRef.nativeElement;
    const windowEl = this.windowElRef.nativeElement;
    draggableEl.style.display = 'block';
    windowEl.style.display = 'block';
  }

  ngOnInit() {
    const draggableEl = this.draggableElRef.nativeElement;
    const resizeEl = this.resizeElRef.nativeElement;
    const windowEl = this.windowElRef.nativeElement;
    const contentEl = this.contentElRef.nativeElement;

    this.unlistenMouseDown = this.renderer2.listen(
      draggableEl,
      'mousedown',
      (e1) => {
        console.log('drag');
        this.unlistenMouseMove = this.renderer2.listen(
          'document',
          'mousemove',
          (event) => {
            //console.log('width: ', this.width);

            //this.renderer2.setStyle(draggableEl, 'left', event.pageX + 'px');
            this.renderer2.setStyle(windowEl, 'left', event.pageX + 'px');
            //this.renderer2.setStyle(contentEl, 'left', event.pageX + 'px');

            //this.renderer2.setStyle(draggableEl, 'top', event.pageY + 'px');
            this.renderer2.setStyle(windowEl, 'top', event.pageY + 'px');
            //this.renderer2.setStyle(contentEl, 'top', event.pageY + 'px');
          }
        );

        this.unlistenMouseUp = this.renderer2.listen(
          'document',
          'mouseup',
          () => {
            this.unlistenMouseMove();
            this.unlistenMouseUp();
          }
        );
      }
    );

    this.initDrag = this.renderer2.listen(resizeEl, 'mousedown', (e1) => {
      //console.log('resize');
      //this.resize = true;
      this.doDrag = this.renderer2.listen('document', 'mousemove', (e) => {
        var startX, startY, startWidth, startHeight;
        startX = e1.clientX;
        startY = e1.clientY;
        startWidth = parseInt(this.getComputedStyle().width, 10);
        startHeight = parseInt(this.getComputedStyle().height, 10);
        console.log(e.clientX, e.clientX);
        //console.log(this.Rwidth, this.Rheight);
        contentEl.style.width = e.clientX + 'px';
        windowEl.style.width = e.clientX + 'px';
        draggableEl.style.width = e.clientX + 'px';
        contentEl.style.height = e.clientY + 'px';
        windowEl.style.height = e.clientY + 'px';
      });

      this.stopDrag = this.renderer2.listen('document', 'mouseup', () => {
        this.doDrag();
        this.stopDrag();
      });
    });
  }

  ngOnDestroy() {
    this.unlistenMouseDown();
    this.initDrag();
  }
}
