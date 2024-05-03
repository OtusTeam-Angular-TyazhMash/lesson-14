import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {TasksService} from "./services/tasks.service";
import {Task} from "./services/task.type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Task[] = []

  task: Task = {
    name: '',
    description: '',
    age: 14
  }

  constructor(private readonly tasksService: TasksService) {}

  ngOnInit(): void {
    this.getTasks()
  }

  private getTasks() {
    this.tasksService.getTasks().subscribe(data => this.tasks = data)
  }

  setEditTask(task: any) {
    this.task = task;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.task.id) {
        this.tasksService.updateTask(this.task).subscribe(() => this.getTasks());
      } else {
        this.tasksService.createTask(this.task).subscribe(() => this.getTasks());
      }
    }
  }

  onNameChanged() {
    console.log('onNameChanged')
  }

  deleteTaskById(id: string) {
    this.tasksService.deleteTaskById(id).subscribe(() => this.getTasks())
  }
}
