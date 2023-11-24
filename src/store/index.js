import Vue from "vue";
import VueX from "vuex";

import axios from "axios";

Vue.use(VueX);

export default new VueX.Store({
  state: {
    cities: [],
  },

  getters: {
    getCities: (state) => {
      return state.cities;
    },
  },
  mutations: {
    setListCity(state, payload) {
      state.cities = payload;
    },
  },

  actions: {
    async getCityList({ commit }) {
      try {
        const res = await axios.get(
          "https://provinces.open-api.vn/api/?depth=2"
        );
        const data = res.data;

        commit("setListCity", data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
