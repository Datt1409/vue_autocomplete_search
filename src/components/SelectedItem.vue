<template>
  <div class="item-selected">
    <p>{{ extractProvinceCityName(item[keyLabel]) }}</p>
    <div class="icon-close" @click="handleRemoveItem(item)">
      <CloseIcon />
    </div>
  </div>
</template>

<script>
import CloseIcon from "./icons/CloseIcon.vue";

import { extractProvinceCityName } from "@/utils";

export default {
  components: {
    CloseIcon,
  },

  props: {
    item: {
      type: Object,
      default: () => {},
    },

    keyLabel: {
      type: String,
      default: () => "name",
    },
  },
  methods: {
    extractProvinceCityName,
    handleRemoveItem() {
      this.$emit("handleRemoveItem");
    },
  },
};
</script>

<style lang="scss" scoped>
.item-selected {
  /* box-sizing: border-box; */
  display: flex;
  align-items: center;
  gap: 10px;
  height: 32px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 0px 8px;
  font-size: 14px;
  line-height: 20px;

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #627d98;
  }

  .icon-close {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
