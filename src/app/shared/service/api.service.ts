import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(
      'https://66be147374dfc195586e84a7.mockapi.io/api/v1/users'
    );
  }

  getUserById(id: any) {
    return this.http.get(
      `https://66be147374dfc195586e84a7.mockapi.io/api/v1/users/${id}`
    );
  }

  createUser(payload: any) {
    return this.http.post(
      'https://66be147374dfc195586e84a7.mockapi.io/api/v1/users',
      payload
    );
  }

  updateUser(userId: any, payload: any) {
    return this.http.put(
      `https://66be147374dfc195586e84a7.mockapi.io/api/v1/users/${userId}`,
      payload
    );
  }

  deleteUser(id: any) {
    return this.http.delete(
      `https://66be147374dfc195586e84a7.mockapi.io/api/v1/users/${id}`
    );
  }
}
