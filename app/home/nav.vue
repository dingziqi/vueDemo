<template>
    <div class="nav-wrap">
        <ul class="nav-ul">
            <li v-for="i in resource" @mouseover="toggleChild($index, $event)"
                @mouseout="toggleChild($index, $event, true)" v-bind:class="{'active': $index == show}">
                <a href="javascript:" v-link="{path: i.url}">{{i.name}}</a>
                <ul class="nav-ul nav-child" v-if="$index == show && i.child" transition="dropdown">
                    <li v-for="i in i.child"><a href="javascript:">{{i.name}}</a></li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    var t = null;
    module.exports = {
        name: 'my-nav',
        props: ['resource'],
        data: function () {
            return {
                show: -1
            }
        },
        methods: {
            toggleChild: function (index, event, isHide) {
                var self = this;
                var el = event.currentTarget;
                if(t){
                    clearTimeout(t);
                }
                t = setTimeout(function(){
                    self.show = isHide ? -1 : index;
                }, 150);
            }
        }
    }
</script>
<style lang="sass">
    .nav-wrap {
        display: inline-block;
        vertical-align: bottom;

    .nav-ul {
        white-space: nowrap;

    li {
        display: inline-block;
        font-size: 16px;
        position: relative;
        border-top: 3px solid transparent;
        transition: background-color .3s ease;
        box-sizing: border-box;
        z-index: 100;

    a {
        color: #999;
        text-decoration: none;
        display: inline-block;
        padding: 10px 24px 13px;
        transition: color .3s ease-in-out;
    }

    }
    .active {
        background-color: darken(#f2f2f2, 5%);
        border-top-color: #22476c;
        transition:  border-color 1s ease;
        >a{
             color: #22476c;
         }
    }

    }

    .nav-child {
        position: absolute;
        top: 100%;
        min-width: 100%;
        background-color: darken(#f2f2f2, 5%);

        a:hover{
            color: #22476c;
        }
    }

    }
    .dropdown-transition{
        transition: all .3s ease;
        height: 42px;
        overflow: hidden;
    }
    .dropdown-enter, .dropdown-leave{
        height: 0;
    }
</style>