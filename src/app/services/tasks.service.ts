import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "./task.type";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private url = 'http://localhost:3000/tasks';
  constructor(private httpClient: HttpClient) {}

  createTask(task: Task) {
    return this.httpClient.post(this.url, task)
  }

  updateTask(task: Task) {
    return this.httpClient.put(`${this.url}/${task.id}`, task)
  }

  deleteTaskById(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`)
  }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url)
  }
}
