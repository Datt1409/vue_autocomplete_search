<template>
  <div class="dropdown-box">
    <template v-if="options.length">
      <div
        v-for="option in options"
        :key="option[keyValue]"
        class="dropdown-item"
        @click="handleSelectItem(option)"
      >
        {{ extractProvinceCityName(option[keyLabel]) }}
      </div>
    </template>

    <template v-else>
      <div class="no-matching">{{ messageNoMatchingData }}</div>
    </template>
  </div>
</template>

<script>
import { extractProvinceCityName } from "@/utils";

export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    keyLabel: {
      type: String,
      default: () => "name",
    },

    keyValue: {
      type: String,
      default: () => "code",
    },

    listSelected: {
      type: Array,
      default: () => [],
    },

    messageNoMatchingData: {
      type: String,
      default: () => "Không có kết quả phù hợp",
    },
  },
  data() {
    return {
      keyword: "",
      isFocused: false,
    };
  },

  computed: {
    checkSelectedItems() {
      return (item) => {
        return this.listSelected.filter(
          (city) => city[this.keyValue] === item[this.keyValue]
        ).length;
      };
    },
  },

  methods: {
    extractProvinceCityName,
    handleSelectItem(item) {
      if (!this.checkSelectedItems(item)) {
        this.$emit("handleSelectItem", item);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-box {
  position: absolute;
  left: 0;
  top: calc(100% + 5px);
  width: 100%;
  border-radius: 4px;
  background: #f1f5f8;
  max-height: 200px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 6px;
    cursor: default;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #dcdcdc;
    border-radius: 4px;
  }

  .dropdown-item {
    padding: 10px;
    cursor: pointer;
    height: 40px;

    &:hover {
      background: #617d98;
      color: #fff;
    }
  }

  .no-matching {
    padding: 10px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
