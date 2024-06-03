# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## 开发时踩到的坑

### 1.动画的animation-fill-mode属性

动画的animation-fill-mode属性设置为forwards后，动画执行完毕会保留最后一帧的样式（即使移除掉这个动画类），可以用这个特性设计一些动画类：
```vue
// js部分
handlePopup() {
  if(!this.isActive) {
    this.isActive = true
    const popupDOM = document.querySelector('#dropdown-popup')
    popupDOM.classList.add('zoom-in-top')
    setTimeout(() => {
      popupDOM.classList.remove('zoom-in-top')
    }, 300);
  } else {
    const popupDOM = document.querySelector('#dropdown-popup')
    // 隐藏
    popupDOM.classList.add('zoom-out-top')
    setTimeout(() => {
      popupDOM.classList.remove('zoom-out-top')
      this.isActive = false
    }, 300)
  }
},

// css部分
.zoom-in-top {
  transform-origin: top center;
  animation: fade-in-animation forwards 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.zoom-out-top {
  transform-origin: top center;
  animation: fade-in-animation reverse forwards 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes fade-in-animation {
  0% {
    opacity: 0;
    transform: scaleY(0);
  }

  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}
```

上面的代码就是通过isActive去设置动画效果，并且动画执行完成后移除掉对应的动画类，但是保留了执行完动画后的结束帧样式。如果想要执行完动画后还原可以把forwards换成backwards或者none(默认backwards)，这样动画执行后回到初始帧。

### 2.利用preventDefault阻止事件触发
```vue
<div class="dropdown-content">
  <input
    @blur.stop="handlePopupBlur"
    @click.stop="handlePopupClick"
    class="dropdown-action-zone"
    placeholder="请选择"
  />
  <i
    class="img-color el-icon-arrow-down"
    :class="isClose ? 'rotate-end' : 'rotate-start'"
  ></i>
</div>
<div id="dropdown-popup" v-show="isActive" class="select-popup" @mousedown.stop="(e)=>e.preventDefault()">
  <ul>
    <li class="dropdown-item">1</li>
    <li class="dropdown-item">2</li>
    <li class="dropdown-item">3</li>
    <li class="dropdown-item">4</li>
    <li class="dropdown-item">5</li>
  </ul>
</div>
```

由于dropdown-popup弹窗和input框不是父子关系，默认情况下没法用冒泡的形式在点击弹窗的时候禁止触发blur。

解决方案：根据click晚于blur触发，mousedown早于blur触发，可以在mousedown中设置preventDefault阻止默认事件的触发，从而实现点击弹窗不触发blur。
