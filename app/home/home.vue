<template>
    <header>
        <div class="container">
            <a href="http://localhost:8080/" class="logo">PaTica</a>
            <my-nav :resource="navList"></my-nav>
        </div>
    </header>
    <slider :resource="imgList"></slider>
    <my-footer></my-footer>
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
            ],
            imgList: [
                {src: '/img/PC.jpg'},
                {src: '/img/PC2.jpg'},
                {src: '/img/PC3.jpg'},
                {src: '/img/PC4.jpg'}
            ]
        },
        components: {
            'my-nav': require('./nav.vue'),
            'slider': require('./slider.vue'),
            'my-footer': require('../common/footer.vue')
        },
        replace: false
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
            text-decoration: none;
        }
    }
</style>