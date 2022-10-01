import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = () => ({
    userInfo: null,
    isLoggIn:false
});

export const loginModule = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};
