import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiResponse } from '../model/common.model';
import { Observable } from 'rxjs';
import { ApiEndpoint } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${ApiEndpoint.UserEndpoint}`);
  }

  getUserById(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(
      `${ApiEndpoint.UserEndpoint}/${id}`
    );
  }

  storeUser(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(
      `${ApiEndpoint.UserEndpoint}`,
      user
    );
  }

  updateUser(id: number, user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(
      `${ApiEndpoint.UserEndpoint}/${id}`,
      user
    );
  }

  deleteUser(id: number): Observable<ApiResponse<User>> {
    return this.http.delete<ApiResponse<User>>(
      `${ApiEndpoint.UserEndpoint}/${id}`
    );
  }
}
