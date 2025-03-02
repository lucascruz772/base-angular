import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { ColumnType, DatatableComponent, TableSettings } from '../../../shared/components/datatable/datatable.component';


@Component({
  selector: 'my-home',
  imports: [DatatableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  
  settings!: TableSettings;

  ngOnInit(): void { 
    this.settings = {
      source: 'https://jsonplaceholder.typicode.com/users',
      columns: [
        {
          id: 'id',
          title: 'ID',
          type: ColumnType.NUMBER,
        },
        {
          id: 'name',
          title: 'Nome',
          type: ColumnType.STRING,
        },
        {
          id: 'email',
          title: 'Email',
          type: ColumnType.STRING,
        },
        {
          id: 'phone',
          title: 'phone',
          type: ColumnType.STRING,
        },
      ],
      pagination: {
        pageSize: 10,
        pageSizeOptions: [5, 10, 25, 100],
      },
      search: {
        enabled: true,
      },
      actions: [
        {
          title: 'Editar',
          icon: 'edit',
          action: () => {
            console.log('Editar');
          },
        },
        {
          title: 'Excluir',
          icon: 'delete',
          action: () => {
            console.log('Excluir');
          },
        },
        {
          title: 'duplicar',
          icon: 'context-copy',
          action: () => {
            console.log('duplicar');
          },
        },
      ],
    };
  }
}