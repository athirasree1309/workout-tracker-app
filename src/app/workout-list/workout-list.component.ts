import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  searchText: string = '';
  filterType: string = '';
  displayedColumns: string[] = ['name', 'workouts'];
  pageSize: number = 5;
  pageIndex: number = 0;

  ngOnInit() {
    this.loadUsers();
    window.addEventListener('storage', this.loadUsers.bind(this)); // Listen for storage event
  }

  loadUsers() {
    this.users = JSON.parse(localStorage.getItem('userData') || '[]');
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.users;

    if (this.searchText) {
      filtered = filtered.filter(user => user.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }

    if (this.filterType) {
      filtered = filtered.filter(user => user.workouts.some((workout: Workout) => workout.type === this.filterType));
    }

    this.filteredUsers = filtered;
    this.paginatedUsers = this.filteredUsers.slice(0, this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }
}
