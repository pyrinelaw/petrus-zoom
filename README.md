# petrus-zoom
用于控制缩放与拖动的组件

## demo
[http://pyrinelaw.github.io/petrus-zoom/demo/](http://pyrinelaw.github.io/petrus-zoom/demo/)

## version
0.0.1

## 如何使用
css 样式可以自由定义，这里只是为了方便使用贴了上来
```css
.container {
    width: 800px;
    margin: 0 auto;
    margin-top: 100px;
}
.demo-zoom {
    .options-info {
        font-size: 12px;
        text-align: right;
        padding-bottom: 5px;
    }
    .tools {
        display: flex;
        font-size: 12px;
        justify-content: flex-end;
        flex-wrap: wrap-reverse;
        padding-bottom: 5px;
        button {
            margin-left: 5px;
        }
    }
    .content {
        height: 400px;
        border: 1px solid #C0C0C0;
        cursor: move;
        .wrap {
            height: calc(100%);
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-row-gap: 5px;
            grid-column-gap: 5px;
            div {
                border: 1px solid #C5C5C5;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 60px;
            }
        }
    }
}
```
```js
import 'petrus-zoom/lib/style';
import Zoom from 'petrus-zoom';

<div className="container">
    <Zoom className="demo-zoom">
        {({ options, onZoomStep, onZoomTo, onPositionTo, onReset }) => (
            <React.Fragment>
                <div className="options-info">{JSON.stringify(options)}</div>
                <div className="tools">
                    <button onClick={() => onZoomStep(8)}>onZoomStep - out</button>
                    <button onClick={() => onZoomStep(-8)}>onZoomStep - in</button>
                    <button onClick={() => {
                        const randomValue = -10 + Math.ceil(Math.random() * 20);
                        onZoomTo(options.scale + randomValue);
                    }}>onZoomTo-随机缩放</button>
                    <button onClick={() => {
                        const randomValue = -20 + Math.ceil(Math.random() * 40);
                        onPositionTo({
                            x: options.position.x + randomValue,
                            y: options.position.y + randomValue,
                        });
                    }}>onPositionTo-随机移动</button>
                    <button onClick={() => {
                        onReset();
                    }}>onReset</button>
                </div>
                <Zoom.Content className="content">
                    <div className="wrap">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div>
                        <div>7</div>
                        <div>8</div>
                        <div>9</div>
                    </div>
                </Zoom.Content>
            </React.Fragment>
        )}
    </Zoom>
</div>
```

### Zoom

| 参数 | 类型 | 是否必填 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| defaultOptions | Object | 否 | null | 初始选项 |
| className | className | 否 |  | 传入样式名 |
| style | Object | 否 | null | 传入样式 |

附，初始选项：

``` javascript
{ 
    scale: 100, // 缩放值，必须为整数
    // 偏移位置
    position: { 
        x: 0,   // x 偏移
        y: 0    // y 偏移
    }
}
```

### Zoom children 参数

| 参数 | 类型 | 是否必填 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| options | Object | 否 |  | 只读属性，当前位移对象 |
| onZoomStep | Function | 否 |  | 按步骤缩放，负数为减小, 例：onZoomTo(-10) |
| onZoomTo | Function | 否 |  | 缩放至特定大小，100为不做任何缩放，例：onZoomTo(110) |
| onPositionTo | Function | 否 |  | 位移至特定位置,例：onPositionTo({x: 0, y: 0})|
| onReset | Function | 否 |  | 重置 options |

### Zoom Children 返回值

返回 React.Fragment 元素与数组都可以,例如

``` javascript
// 返回 React.Fragment
return (
    <React.Fragment>
        // ...
    <React.Fragment>
);
// 返回数组
return [
    <div>tool</div>
    <Zoom.Content>...</Zoom.Content>
];
```

### Zoom.Content

| 参数 | 类型 | 是否必填 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| className | className | 否 |  | 传入样式名 |
| style | Object | 否 | null | 传入样式 |
| justifyContent | string | 否 | center | 与 css 属性 justifyContent 用法一致 |
| transformOrigin | string | 否 | center | 与 css 属性 transformOrigin 用法一致 |
| children | React Dom | 否 | null | 子元素宽度或者高度超出的情况下，超出部分会被隐藏 |