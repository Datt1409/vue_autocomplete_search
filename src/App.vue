<template>
  <div id="app">
    <InputContainer
      placeholder="Nhập tên thành phố để tìm kiếm"
      v-model="keyword"
      :options="filteredList"
      :keywordName="keywordName"
      :code="code"
      :maxChoice="3"
      :listSelected="selectedCities"
      @handleSelectItem="handleSelectItem"
      @handleRemoveItem="handleRemoveItem"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import InputContainer from "./components/InputContainer.vue";

export default {
  components: {
    InputContainer,
  },
  data() {
    return {
      keyword: "",
      keywordName: "name",
      code: "code",
      selectedCities: [],
    };
  },

  created() {
    this.$store.dispatch("getCityList");
  },

  computed: {
    ...mapGetters(["getCities"]),
    filteredList() {
      let trimmedKeyword = this.keyword.trim();
      return (
        (trimmedKeyword.length &&
          this.getCities.filter((city) =>
            city[this.keywordName]
              .toLowerCase()
              .includes(trimmedKeyword.toLowerCase())
          )) ||
        []
      );
    },
  },

  methods: {
    ...mapActions(["fetchListCities"]),
    handleSelectItem(item) {
      this.selectedCities.push(item);
    },

    handleRemoveItem(item) {
      this.selectedCities = this.selectedCities.filter(
        (city) => city[this.code] !== item[this.code]
      );
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
