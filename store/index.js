import Vue from 'vue';
import Vuex from 'vuex';
import cards from '@/store/modules/cards';
import { loginModule as login } from './modules/login';


Vue.use(Vuex);

export default () =>
    new Vuex.Store({
        state: () => ({}),
        mutations: {},
        actions: {},
        modules: {
            cards,
            login
        },
    })


