import { ChangeDetectionStrategy, 
  Component, 
  Input,
  type OnInit,
} from '@angular/core';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule }  from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'my-private-layout',
  imports: [
    RouterModule, 
    MatSidenavModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
  ],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLayoutComponent implements OnInit {
  @Input() isMenuOpen = true;

  ngOnInit(): void { }

}
