export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum Status {
  Progress = 'Progress',
  Completed = 'Completed',
}

export class CreateTaskDto {
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: Priority;
  status: Status;
}
