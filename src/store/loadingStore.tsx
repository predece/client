import { makeAutoObservable } from "mobx";

class Loading {
    onWindowLoading
  constructor() {
    makeAutoObservable(this);
  }
}
