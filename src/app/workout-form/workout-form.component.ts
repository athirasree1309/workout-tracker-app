import { Component } from '@angular/core';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {
  workoutData = {
    username: '',
    workoutType: '',
    workoutMinutes: 0
  };

  onSubmit() {
    let users = JSON.parse(localStorage.getItem('userData') || '[]');
    const user = users.find((u: any) => u.name === this.workoutData.username);

    if (user) {
      user.workouts.push({
        type: this.workoutData.workoutType,
        minutes: this.workoutData.workoutMinutes
      });
    } else {
      users.push({
        id: users.length + 1,
        name: this.workoutData.username,
        workouts: [{
          type: this.workoutData.workoutType,
          minutes: this.workoutData.workoutMinutes
        }]
      });
    }

    localStorage.setItem('userData', JSON.stringify(users));
    console.log('Workout Data:', this.workoutData);
    this.resetForm();
  }

  resetForm() {
    this.workoutData = {
      username: '',
      workoutType: '',
      workoutMinutes: 0
    };
  }
}
