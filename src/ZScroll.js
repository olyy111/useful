
import {
    EventEmitter,
    extend,
    css,
    ZTween
} from "./utils"

const SWIPEBASE = 100
const SWIPEDISBASE = 20
const STAYTIME = 60

class ZScroll extends EventEmitter{
    constructor(opations){
        super()

        this.defaults = {
            el: opations.el,
            fingerTime: 60,
            hasScrollBar: true,
            scrollBarId: "scrollBar",
            bounce: true,
            bounceScale: 0.33,
            bounceDuration: 0.5,
            swipeDuration: 0.8,
            minBarHeight: 30,
            swipeDisFactor:  1
        }
        
        this.wrapper = document.querySelector(this.defaults.el)
        this.scroller = this.wrapper.firstElementChild
        
        css(this.scroller, 'translateZ', '0.01')
        
        this.x = 0

        this._moveFlag = false

        this.maxDisplacement = this.scroller.offsetHeight - this.wrapper.clientHeight

        this._oriX = this._oriTransY = this._lastY = this._lastDisY = this._lastMoveTime = 0
        this._init()
    }
    _init(){
        this._moveFlag = this.wrapper.clientHeight - this.scroller.offsetHeight < 0 ?
            true :
            false
        if(!this._moveFlag) return

        if(this.defaults.hasScrollBar){
            this._initScrollBar()
        }

        this.scroller.addEventListener('touchstart', this._touchStart.bind(this))
        this.scroller.addEventListener('touchmove', this._touchMove.bind(this))
        this.scroller.addEventListener('touchend', this._touchEnd.bind(this))
    }
    refresh(){
        this.wrapper = document.querySelector(this.defaults.el)
        this.scroller = this.wrapper.firstElementChild
        this.maxDisplacement = this.scroller.offsetHeight - this.wrapper.clientHeight;

        this._moveFlag = this.wrapper.clientHeight - this.scroller.offsetHeight < 0 ?
            true :
            false

        this.x = 0
        css(this.scroller, "translateY", 0)

        this.trigger('refresh')
    }
    disable(){
        this._moveFlag = false
        this.trigger('pause')
    }
    enable(){
        this._moveFlag = true
        this.trigger('restart')
    }
    scrollTo(y, duration=300, type="easeOut"){
        clearInterval(this.scroller.timer)
        ZTween({
            el: this.scroller,
            target:{
                "translateY": y
            },
            type: type,
            time: duration,
            callIn: () => {
                this._scrollBarMoveFn()
                this.trigger('scroll')	
            },
            callBack: () => {
                this._scrollBarCallBack()
                this.trigger('swipeend')
            }
        })
    }
    _touchStart(ev){
        if(!this._moveFlag) return
        clearInterval(this.scroller.timer)

        this._oriX = ev.changedTouches[0].pageY;
        this._oriTransY = css(this.scroller, "translateY");
        this._lastY = this._oriX;

        this.trigger('scrollstart')
    }
    _touchMove(ev){
        if(!this._moveFlag) return

        let currentY = ev.changedTouches[0].pageY;

        let disY = currentY - this._oriX;
        this.x = this._oriTransY + disY;
        
        this._dealBoundaryMove()

        css(this.scroller,"translateY" , this.x);
        
        this._lastDisY = currentY - this._lastY
        this._lastY = currentY	
        this._lastMoveTime = new Date().getTime()

        this._scrollBarMoveFn()

        this.trigger('scroll')
    }
    _touchEnd(ev){
        if(!this._moveFlag) return

        this.trigger('scrollend')
        
        this.x = Math.round(css(this.scroller, "translateY"))
        let endTime = new Date().getTime()
        let lastDisTime = endTime - this._lastMoveTime

        
        
        //长时按压，手指离开继续滚动
        if(lastDisTime>STAYTIME){
            if(this.x<0 && this.x>-this.maxDisplacement){
                ZTween({
                    el:this.scrollBar,
                    target: {
                        'opacity': 0
                    },
                    type: 'linear',
                    time: 200
                })
                this.trigger('swipeend')
                return
            }
        }

        this._target = Math.round(this.x + this._lastDisY*SWIPEDISBASE*this.defaults.swipeDisFactor)
        
        this._type = "easeOut"
        
        this._swipeTimeBase = this.defaults.swipeDuration*SWIPEBASE;
        
        this._bounceMoveTimeFn()

        let swipeTime = Math.sqrt(Math.abs(this._target - this.x))*this._swipeTimeBase
        
        this._lastMoveTime = null
        this._lastDisY = null
        
        ZTween({
            el: this.scroller,
            target:{
                "translateY": this._target
            },
            type: this._type,
            time: swipeTime,
            callIn: () => {
                this._scrollBarMoveFn()
                this.trigger('scroll')	
            },
            callBack: () => {
                this._scrollBarCallBack()
                this.trigger('swipeend')
            }
        })
    }
    _dealBoundaryMove(){
        if(this.defaults.bounce){

            //如果currentTransY超过边界值，那么屏幕跟随手指移动比例变为3：1 移动更小的距离
            if(this.x < -this.maxDisplacement){
                this.x = -this.maxDisplacement + (this.x + this.maxDisplacement)*this.defaults.bounceScale
            }else if(this.x>0){
                this.x = this.x*this.defaults.bounceScale
            }
        }else {
            if(this.x < -this.maxDisplacement){
                this.x = -this.maxDisplacement
            }else if(this.x > 0){
                this.x = 0
            }
        }
    }
    _bounceMoveTimeFn(){
        if(this._target < -this.maxDisplacement){
            
            this._target = -this.maxDisplacement
            
            if(this.defaults.bounce){
                this._type = "backOut"
                this._swipeTimeBase = this.defaults.swipeDuration*SWIPEBASE*this.defaults.bounceDuration
            }
        }else if(this._target>0){
            
            this._target = 0;
            
            if(this.defaults.bounce){
                this._type = "backOut"
                this._swipeTimeBase = this.defaults.swipeDuration*SWIPEBASE*this.defaults.bounceDuration
            }	
        }
    }
    _initScrollBar(){
        this.scrollBar = document.createElement('div');
        this.defaults.hasScrollBar&&this.scrollBar.setAttribute('id', this.defaults.scrollBarId);

        this.wrapper.appendChild(this.scrollBar);
    }
    _scrollBarMoveFn(){
        if(!this.defaults.hasScrollBar) return
        if(this.defaults.hasScrollBar) {
            this.scrollBar.style.opacity = 1
        }

        this.x = css(this.scroller, 'translateY')

        let scaleHeight = this.wrapper.clientHeight / this.scroller.offsetHeight,
            scrollBarHeight = this.wrapper.clientHeight*scaleHeight,
            maxScrollDis = this.wrapper.clientHeight - scrollBarHeight,
            maxScrollReduction = scrollBarHeight - this.defaults.minBarHeight
        this.scrollBar.style.height = scrollBarHeight + 'px';

        let overShow;

        if(this.x < -this.maxDisplacement){

            //滚动条增加或者减少的长度	
            overShow = - this.x - this.maxDisplacement;
            overShow = Math.min(overShow, maxScrollReduction)

            css(this.scrollBar, 'height', scrollBarHeight - overShow)
            css(this.scrollBar, 'translateY', maxScrollDis + overShow)
        }else if(this.x>0){
            overShow = this.x
            overShow = Math.min(overShow, maxScrollReduction)

            css(this.scrollBar, 'height', scrollBarHeight - overShow)
            css(this.scrollBar, 'translateY', 0)
        }else {
            let scaleY = -this.x/this.maxDisplacement

            css(this.scrollBar, 'translateY', maxScrollDis*scaleY);
        }
    }
    _scrollBarCallBack(){
        if(!this.defaults.hasScrollBar) return
        ZTween({
            el:this.scrollBar,
            target: {
                'opacity': 0
            },
            type: 'linear',
            time: '200'
        })
    }

}