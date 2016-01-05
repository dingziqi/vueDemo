<template>
    <div class="slider-warp">
        <ul v-bind:style="'transform: translateX(-' + current + '00%);'">
            <li v-for="i in resource">
                <img v-bind:src="i.src" class="item"/>
            </li>
        </ul>
        <a href="javascript:" class="arrow-left" @click="toggle(false)">&lt;</a>
        <a  href="javascript:" class="arrow-right" @click="toggle(true)">&gt;</a>
        <ul class="indicator-warp">
            <li v-for="i in resource" @click="toggle(true, $index)" :class="{'active': $index == current}"></li>
        </ul>
    </div>
</template>
<script>
    var time = Date.now();
    module.exports = {
        props: ['resource'],
        data: function(){
            return{
                current: 0
            }
        },
        methods: {
            toggle: function(isForward, index){
                if(Date.now() - time < 800){
                    return;
                }
                time = Date.now();
                if(typeof index === 'number'){
                    this.current = index;
                    return;
                }
                var len = this.resource.length - 1;
                var current = this.current;
                this.current = isForward ? (current < len ? (current+1) : 0)
                                        : (current > 0 ? current - 1 : len);
            }
        },
        ready: function(){
                var self = this;
                setInterval(function(){
                    if(Date.now - time < 5000){
                        return;
                    }
                    self.toggle(true);
                }, 5000);
            }
    };
</script>
<style lang="sass">
    .slider-warp{
        width: 100%;
        font-size: 0;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        background-color: #f2f2f2;

        >ul{
            transition: all 1s ease;
         }

        li{
            display: inline-block;
        }

        .item{
            width: 100%;
            background-color: #ddd;
            min-height: 400px;
        }

        .arrow-left, .arrow-right{
            font-size: 48px;
            color: #fff;
            text-decoration: none;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            height: 50px;
            line-height: 50px;
            width: 50px;
            text-align: center;
            background-color: rgba(0, 0, 0, .2);
            transition: background-color .5s ease;

            &:hover{
                 background-color: rgba(0, 0, 0, .5);
             }
        }
        .arrow-left{
            left: 12px;
        }
        .arrow-right{
            right: 12px;
        }
        .indicator-warp{
            position: absolute;
            bottom: 12px;
            width: 100%;
            text-align: center;

            >li{
                 display: inline-block;
                 width: 12px;
                 height: 12px;
                 background-color: rgba(255 ,255 ,255 , .5);
                 border-radius: 50%;
                 margin: 0 6px;
                 cursor: pointer;
                transition: all .3s ease;
             }
             .active{
                 background-color: #fff;
             }
        }
    }
</style>