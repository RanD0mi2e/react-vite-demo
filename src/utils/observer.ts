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

// 观察者基类
export class BasicObserver<T> implements Observer<T> {
  id: string;
  value: T;
  callback?: (value: T) => void; // 可选的回调函数

  constructor(id: string, value: T, callback?: (value: T) => void) {
    this.id = id;
    this.value = value;
    this.callback = callback;
  }

  update(value: T) {
    // 更新值并执行回调函数
    this.value = value
    if(this.callback) {
      this.callback(value);
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