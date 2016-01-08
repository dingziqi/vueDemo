/**
 * Created by ziki on 2015/12/29.
 */

var Vue = require('vue');
var vueRouter = require('vue-router');
Vue.use(vueRouter);
Vue.config.debug = true;

var app = Vue.extend({});
var router = new vueRouter();
router.map({
    '/': {
        component: require('./home/home.vue')
    },
    '/about': {
        component: require('./about/about.vue')
    }
});

router.start(app, '#app');
