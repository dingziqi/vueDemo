<template>
    <header>
        <div class="container">
            <span class="logo">PaTica</span>
            <my-nav :source="navList"></my-nav>
        </div>
    </header>
</template>
<script>
    module.exports = {
        el: '#app',
        data: {
            navList: [
                {name: '首页'},
                {
                    name: '维修服务',
                    child: [
                        {name: '手机维修'},
                        {name: 'pad维修'}
                    ]
                },
                {name: '特色服务'},
                {name: '公司简介'},
                {name: '联系我们'}
            ]
        },
        components: {
            'my-nav': require('./nav.vue')
        }
    }
</script>
<style lang="sass">
    header {
        background-color: #f2f2f2;
        line-height: 1;

        .logo {
            font-size: 18px;
            padding: 12px 24px;
            color: #22476c;
            font-weight: bold;
            line-height: 42px;
        }
    }
</style>