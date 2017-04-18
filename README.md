# ZScroll

## 立即使用

```HTML
<body>
    <script src="zscroll.js"></script>
    <div id="wrapper">
        <div id="inner">
        </div>
    </div>
    <script>
        function createLis(num){
			let html = "";
			for(let i=0;i<num;i++){
				html += '<li>这是第' + i + '行</li>';
			}
			inner.innerHTML = html;
		}
        createLis(100)
        new ZScroll({
            el: '#wrapper',
            hasScroll:true,
            scrollBarId: 'scrollBar'
        })
    </script>
</body>

```

## DEMO

首先，clone项目源码

```shell
https://github.com/olyy111/useful
```

测试demo页

```shell
npm run dev
```

打开浏览器访问如下地址, 查看效果

> localhost:8888

## Options 参数

Example:

```javascript
let scroll = new ZScroll({
    el:"#wrapper"
})
```

Options List:

- el: 外层元素的id
- fingerTime: 60 当手指按下多久之后，元素不在滚动
- hasScrollBar: true, 是否有滚动条
- scrollBarId: "scrollBarId" 滚动条id
- bounce:true  是否开启弹力动画
- bounceScale: 0.33 弹力动画开启时超过分界点后的位移比(与实际位移)
- bounceDuration: 0.8 弹力动画时间因数
- swipeDuration: 0.8 惯性滚动持续时间因数
- minBarHeight: 30 最小滚动条高度
- swipeDisFactor: 1 唤醒滚动距离因数

根据滚动条id自定义样式：background border-radius width

## Events 事件

Example:

```javascript
let scroll = new ZScroll({
    el: "#wrapper"
})

scroll.on('scroll', () => {
    console.log(scroll.y)
})
```

Events 列表

- scrollstart - 滚动开始时触发
- scroll - 滚动时触发
- scrollend - 滚动结束时触发（手指离开和惯性滚动会分别触发）
- swipeend - 当惯性滚动结束时触发（如果没有惯性滚动手指离开触发）
- refresh - 当 ZScroll 刷新时触发
- pause - disable()时触发
- restart - enable()时触发

## api
scroll为滚动实例
scroll.refresh() 当DOM高度发生变化，重新计算滚动
scroll.disable() 暂停滚动
scroll.enable() 重新开始滚动

## 派发滚动

- scrollTo(y, time, easing) 滚动到某个位置，y 代表垂直坐标，time 表示动画时间，easing 表示缓动函数

Example:

```javascript
let scroll = new ZScroll(｛el: "#wrapper"｝)
scroll.scrollTo(0, 500)
```




