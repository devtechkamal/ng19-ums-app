import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SharedConfModule } from '../../../shared/shared-conf.module';
import { ContainerComponent } from '../../../layouts/container/container.component';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../../../core/model/user.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-manage-user',
  imports: [DatePipe, SharedConfModule, ContainerComponent, RouterLink],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ManageUserComponent implements OnInit {
  pageTitle = 'Manage User';
  users: User[] = [];
  loading = false;
  userService: UserService = inject(UserService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  messageService: MessageService = inject(MessageService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editUser(id: number) {
    this.router.navigate(['users', id, 'edit']);
  }

  deleteUser(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Save',
      },
      accept: () => {
        this.userService.deleteUser(id).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message,
              life: 1000,
            });
            this.getUsers();
          },
          error: (error) => {
            console.error(error);
          },
        });
      },
      reject: () => {},
    });
  }
}
