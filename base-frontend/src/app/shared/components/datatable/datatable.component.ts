import { 
  ChangeDetectionStrategy, 
  Component, 
  type AfterViewInit,
  type OnInit,
  ViewChild,
  Input,
 } 
  from '@angular/core';

  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatTableDataSource, MatTableModule } from '@angular/material/table';
  import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
  import { MatSort, MatSortModule } from '@angular/material/sort';
  import { Subject } from 'rxjs';

@Component({
  selector: 'my-datatable',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule,],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class DatatableComponent implements OnInit, AfterViewInit {
  @Input() settings!: TableSettings;
  
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor() {
    this.dataSource = new MatTableDataSource([
      { 
        id: 1, 
        name: 'João', 
        email: 'exemplo@email.com', 
        phone: '123456789'
      },
      { 
        id: 2, 
        name: 'Maria', 
        email: 'exemplo@gmail.com', 
        phone: '987654321' 
      },
      { 
        id: 3,
         name: 'José',
          email: 'exemplo@gmail.com',
           phone: '987654321' 
      },
      { 
        id: 4,
         name: 'Pedro',
          email: 'exemplo@gmail.com',
           phone: '987654321' 
      },
    ] as any[]);
  }

  ngOnInit(): void { 
    if(!this.settings){
      throw new Error('Settings is required');
    }

    this.displayedColumns = this.settings.columns.map((column) => column.id);
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.paginator);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

export interface TableSettings {
  source: string;
  columns: Column[];
  pagination?: PaginationDataTableSettings;
  search?: SearchDataTableSettings;
  actions?: ActionsDataTableSettings[];
  
  filters?: Filter[];
  forceUpdate?: Subject<void>;
}

interface Column {
  id: string;
  title: string;
  type: ColumnType;

  sortable?: boolean;
  filterable?: boolean;

  transform?: (row: any) => any;
  actions?: ActionsDataTableSettings[];

  extra?: {
    [key: string]: any;
  };
}


  interface Filter{}

  interface ActionsDataTableSettings {}

  interface PaginationDataTableSettings {}
  interface SearchDataTableSettings {}
  

  export enum ColumnType {
    STRING = 'string',
    NUMBER = 'number',
    DATE = 'date',
    BOOLEAN = 'boolean',
    ACTIONS = 'actions',
    CURRENCY = 'currency',
    ENUM = 'enum',
    LONGSTRING = 'text',
    TRANSFORMTEXT = 'transformText',
  }
