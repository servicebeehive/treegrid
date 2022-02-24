import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { dataSource, virtualData } from 'src/app/helper/dataset';
import { TableVirtualScrollStrategy } from 'src/app/virtual-scroll/virtual-scroll.strategy';
import {
  ContextMenuDetail,
  MainContextMenuVal,
} from './contextmenu/contextmenu.modal';
import { EditColumnDialogComponent } from './dialog/column/edit/edit.component';
import { NameColumnDialogComponent } from './dialog/column/name/name.component';

const PAGESIZE = 20;
const ROW_HEIGHT = 48;

interface dataSetNode {
  TaskID: number;
  FIELD1: string;
  FIELD2: number;
  FIELD3: number;
  FIELD4: number;
  FIELD5: number;
  Crew?: dataSetNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  TaskID: number;
  FIELD1: string;
  FIELD2: number;
  FIELD3: number;
  FIELD4: number;
  FIELD5: number;
  level: number;
}

@Component({
  selector: 'bi-treegrid',
  templateUrl: './bi-treegrid.component.html',
  styleUrls: ['./bi-treegrid.component.scss'],
})
export class BiTreegridComponent implements AfterViewInit {
  displayedColumns: string[] = ['TaskID', 'FIELD1', 'TaskID1'];
  //displayedColumns: string[] = ['id', 'name', 'age'];

  contextItem: ContextMenuDetail[] = [];
  mainContextMenu: ContextMenuDetail[] = [];

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  public fullDatasource: dataSetNode[];

  static BUFFER_SIZE = 3;
  rowHeight = 48;
  headerHeight = 56;

  gridHeight = 400;

  private transformer = (node: dataSetNode, level: number) => {
    return {
      expandable: !!node.Crew && node.Crew.length > 0,
      TaskID: node.TaskID,
      FIELD1: node.FIELD1,
      FIELD2: node.FIELD2,
      FIELD3: node.FIELD3,
      FIELD4: node.FIELD4,
      FIELD5: node.FIELD5,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.Crew
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  pending: boolean;
  sticky = false;
  itemSize = 100;

  constructor() {
    dataSource();
    this.fullDatasource = virtualData;
    this.dataSource.data = this.fullDatasource.slice(0, 10);
    this.mainContextMenu = MainContextMenuVal;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngAfterViewInit() {
    this.virtualScroll.renderedRangeStream.subscribe((range) => {
      this.dataSource.data = this.fullDatasource.slice(range.start, range.end);
      //this.treeControl.expandAll();
    });
  }

  onlClick(data?: any) {
    this.treeControl.expandAll();
    this.treeControl.toggle(data);
  }

  // context menu fuctions
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  headeritem = [{ name: 'table1' }, { name: 'table2' }];
  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, item, actiontype) {
    this.contextItem = [];

    this.mainContextMenu.forEach((e) => {
      if (e.actiontype == actiontype) {
        this.contextItem.push(e);
      } else if (e.actiontype == actiontype) {
        this.contextItem.push(e);
      }
    });

    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

<<<<<<< HEAD
  // testClick() {
  //   console.log('test');

  //   let dialogRef = this.dialog.open(EditColumnDialogComponent, {
  //     width: '250px',
  //     data: {},
  //   });
=======
  editClick(){
    console.log('test')

    let dialogRef = this.dialog.open(EditColumnDialogComponent, {
      width: '450px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  nameClick(){
    console.log('test')

    let dialogRef = this.dialog.open(NameColumnDialogComponent, {
      width: '450px',
      data: { }
    });
>>>>>>> 0c8c87a86a51adb485aaa32abee3ad2e8b4856a1

  //   dialogRef.afterClosed().subscribe((result) => {});
  // }

  onClickContextMenu(event) {
    console.log(event);
  }
}
