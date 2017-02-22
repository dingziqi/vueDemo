var infiniteScroller = function(container){
    this.RUNWAY_ITEMS = 30;
    this.RUNWAY_ITEMS_OPP0SITE = 5;
    this.anchorScrollTop = 0;
    this._items = [];
    this.unUsedNode = [];
    this._scroller = container;

    this.onScroll();
    this._scroller.addEventListener('scroll', this.onScroll.bind(this));

    // setInterval(function(){
    //     console.log(document.querySelector('#scroller').children.length);
    // }, 500);
}

infiniteScroller.prototype= {

    onScroll: function(){
        //判断滚动方向，delta<0为向上滑，反之亦然
        var delta = this._scroller.scrollTop - this.anchorScrollTop;

        //重置上锚点scrollTop
        this.anchorScrollTop = this._scroller.scrollTop;

        //计算上锚点
        if(this._scroller.scrollTop == 0){
            this.anchorItem = {index: 0, offset: 0};
        } else{
            this.anchorItem = this.calculateAnchoredItem(this.anchorItem, delta);
        }
        //计算下锚点
        this.lastScreenItem = this.calculateAnchoredItem(this.anchorItem, this._scroller.offsetHeight);

        if(delta < 0){
            this.fill(this.anchorItem.index - this.RUNWAY_ITEMS, this.lastScreenItem.index + this.RUNWAY_ITEMS_OPP0SITE);
        } else{
            this.fill(this.anchorItem.index - this.RUNWAY_ITEMS_OPP0SITE, this.lastScreenItem.index + this.RUNWAY_ITEMS);
        }
    },

    calculateAnchoredItem: function(initialAnchor, delta){
        //未滚动位置
        if(delta == 0) return initialAnchor;

        // 判读是否上锚点元素是否超届
        delta += initialAnchor.offset;

        var i = initialAnchor.index;

        if(delta < 0){
            while(delta < 0 && i < this._items.length && this._items[i].height){
                delta += this._items[i].height;
                i--;
            }
        } else{
            while( delta > 0 && i < this._items.length && this._items[i].height){
                delta -= this._items[i].height;
                i++;
            }
        }

        return {
            index: i,
            offset: delta
        }
    },

    fill(start, end){
        start = Math.max(start, 0);
        // 回收DOM
        for(var i = 0; i < this._items.length; i++){
            if(i == start){
                i = end - 1;
                continue;
            }

            if(this._items[i].node){
                this._items[i].node.classList.add('invisible');
                this.unUsedNode.push(this._items[i].node);
                this._items[i].node = null;
            }

        }

        var curPos;
        for(var i = start; i < end; i++){
            if(!this._items[i] || !this._items[i].node){
                if(this.unUsedNode.length > 0){
                    var li = this.unUsedNode.pop();
                } else{
                    var li = document.createElement('li');
                    this._scroller.appendChild(li);
                }
                li.id = i;
                li.innerText = i;
                curPos = 0;
                for(var j =0; j < i; j++){
                    curPos += this._items[j].height;
                }
                li.classList.remove('invisible');
                li.style = 'position: absolute;transform: translateY(' + curPos + 'px);';
                this._items[i] = {
                    node: li,
                    height: li.offsetHeight
                };
            }
        }
    }

};

var container = document.querySelector('#scroller');
new infiniteScroller(container);

function getData(pageNo){
    var result = [];
    for(var i = 0; i < 10; i++){
        result.push(i);
    }
    return result;
}
