<template>
    <header>
        <div class="container">
            <a href="http://localhost:8080/" class="logo">Vue</a>
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
                {name: 'home'},
                {
                    name: 'demo'
                },
                {name: 'about'}
            ],
            imgList: [
                {src: '/img/bg1.png'},
                {src: '/img/bg2.png'},
                {src: '/img/bg3.png'},
                {src: '/img/bg4.png'}
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