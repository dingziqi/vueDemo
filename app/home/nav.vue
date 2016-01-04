<template>
    <div class="nav-wrap">
        <ul class="nav-ul">
            <li v-for="i in source" @mouseover="toggleChild($index, $event)"
                @mouseout="toggleChild($index, $event, true)" v-bind:class="{'active': $index == show}">
                <a href="javascript:">{{i.name}}</a>
                <ul class="nav-ul nav-child" v-if="$index == show && i.child.length > 0" transition="dropdown">
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
        props: ['source'],
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
        font-size: 18px;
        position: relative;
        transition: background-color .3s ease-in-out;

    a {
        color: #999;
        text-decoration: none;
        display: inline-block;
        padding: 12px 24px;
        transition: color .3s ease-in-out;
    }

    }
    .active {
        background-color: darken(#f2f2f2, 5%);
        >a{color: #22476c;}
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