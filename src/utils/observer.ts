// 观察者抽象接口
interface Observer<T> {
  id: string;
  update: (value: T) => void;
}

// 被观察者抽象接口
interface Subject<T> {
  notify: () => void;
  register: (observer: Observer<T>) => void;
  deRegister: (observer: Observer<T>) => void;
}

export type BasicObserverCallback<U> = (param: U) => void
// 观察者基类
export class BasicObserver<T> implements Observer<T> {
  id: string;
  value: T | BasicObserverCallback<T>;

  constructor(id: string, value: T | BasicObserverCallback<T>) {
    this.id = id;
    this.value = value;
  }

  update(value: T) {
    // 如果观察者接收的是回调函数，则执行回调；如果接收是普通值，那就执行赋值
    if(typeof this.value === "function") {
      (this.value as BasicObserverCallback<T>)(value)
    } else {
      this.value = value;
    }
  }
}

// 被观察者基类
export class BasicSubject<T> implements Subject<T> {
  observerList: Observer<T>[] = [];
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set value(value: T) {
    debugger
    this._value = value;
    this.notify();
  }

  notify() {
    this.observerList.forEach((observer) => {
      observer.update(this._value);
    });
  }

  register(observer: Observer<T>) {
    this.observerList.push(observer);
  }

  deRegister(observer: Observer<T>) {
    const index = this.observerList.findIndex((item) => item.id === observer.id)
    if (index !== -1) {
      this.observerList.splice(index, 1)
    }
  }
}
