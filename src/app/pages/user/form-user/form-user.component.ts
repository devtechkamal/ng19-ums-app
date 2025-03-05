import { Component, inject, OnInit } from '@angular/core';
import { SharedConfModule } from '../../../shared/shared-conf.module';
import { ContainerComponent } from '../../../layouts/container/container.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../core/services/user.service';
import { Role } from '../../../core/model/common.model';

@Component({
  selector: 'app-form-user',
  imports: [
    SharedConfModule,
    ContainerComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss',
  providers: [MessageService],
})
export class FormUserComponent {
  pageTitle = 'Create User';
  userForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  userService: UserService = inject(UserService);
  router: Router = inject(Router);
  position: string = '';
  roles: Role[] = [];
  userId: number = 0;
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  editMode = false;
  messageService: MessageService = inject(MessageService);
  userSubscription: Subscription = new Subscription();

  constructor() {
    this.userForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('USER', [Validators.required]),
    });

    this.roles = [{ name: 'USER' }, { name: 'ADMIN' }];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.pageTitle = 'Edit User';
        this.editMode = true;
        this.userId = params['id'];
        this.userService.getUserById(params['id']).subscribe((response) => {
          this.userForm.patchValue(response.data);
        });
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userObservable = this.editMode
        ? this.userService.updateUser(this.userId, this.userForm.value)
        : this.userService.storeUser(this.userForm.value);

      this.userSubscription = userObservable.subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
            life: 1000,
          });
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 1000);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
