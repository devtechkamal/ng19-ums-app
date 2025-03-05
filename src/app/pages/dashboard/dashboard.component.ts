import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ContainerComponent } from '../../layouts/container/container.component';
import { SharedConfModule } from '../../shared/shared-conf.module';

@Component({
  selector: 'app-dashboard',
  imports: [ContainerComponent, SharedConfModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);

  constructor() {}

  ngOnInit(): void {}
}
