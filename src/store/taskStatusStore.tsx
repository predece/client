import { makeAutoObservable } from "mobx";

class Task {
  onClickOpenWindowNewTask: boolean = false; // Создание task
  onClickOpenwindowTitleTask: boolean = false; // Открытие окна "Входящие"
  onClickOpenWindowDoneTask: boolean = false; // Открытие окна "Выполнено"
  onClickOpenWindowExpiredTask: boolean = false; // Открытие окна "Просрочено"
  onClickOpenWindowMessageTask: boolean = false; // Открытие окна "Уведомление о таксах"
  onWindowLoading: boolean = false; // Окно загрузки (модификация)
  onClickOpenWindowUpdateTask: boolean = false; // Открытие окна "Обновление тасков"
  onBackGroundTitle: string = "";
  constructor() {
    makeAutoObservable(this);
  }
  postWindowTask(status: boolean) {
    if (this.onClickOpenWindowNewTask != status) {
      this.onClickOpenWindowNewTask = status;
    }
  }
  postWindowTitleTask(status: boolean) {
    if (this.onClickOpenwindowTitleTask != status) {
      this.onClickOpenwindowTitleTask = status;
    }
  }
  postWindowDoneTask(status: boolean) {
    if (this.onClickOpenWindowDoneTask != status) {
      this.onClickOpenWindowDoneTask = status;
    }
  }
  postWindowExpiredTask(status: boolean) {
    if (this.onClickOpenWindowExpiredTask != status) {
      this.onClickOpenWindowExpiredTask = status;
    }
  }
  postWindowMessageTask(status: boolean) {
    if (this.onClickOpenWindowMessageTask != status) {
      this.onClickOpenWindowMessageTask = status;
    }
  }
  postWindowLoading(status: boolean) {
    if (this.onWindowLoading != status) {
      this.onWindowLoading = status;
    }
  }
  postWindowUpdateTask(status: boolean) {
    if (this.onClickOpenWindowUpdateTask != status) {
      this.onClickOpenWindowUpdateTask = status;
    }
  }
  postBackGroundTitle(title: string) {
    if (this.onBackGroundTitle != title) {
      this.onBackGroundTitle = title;
    }
  }

  getWindowTask() {
    return this.onClickOpenWindowNewTask;
  }
  getWindowTitleTask() {
    return this.onClickOpenwindowTitleTask;
  }
  getWindowDoneTask() {
    return this.onClickOpenWindowDoneTask;
  }
  getWindowExpiredTask() {
    return this.onClickOpenWindowExpiredTask;
  }
  getWindowMessageTask() {
    return this.onClickOpenWindowMessageTask;
  }
  getWindowLoading() {
    return this.onWindowLoading;
  }
  getWindowUpdateTask() {
    return this.onClickOpenWindowUpdateTask;
  }
  getBackGroundTitle() {
    return this.onBackGroundTitle;
  }
}

export const task = new Task();
