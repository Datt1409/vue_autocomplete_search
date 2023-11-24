<template>
  <div class="container">
    <div class="search-icon">
      <SearchIcon />
    </div>

    <div class="input-box">
      <template v-if="listSelected.length">
        <SelectedItem
          v-for="item in listSelected"
          :key="item[code]"
          :keywordName="keywordName"
          :item="item"
          @handleRemoveItem="handleRemoveItem(item)"
        />
      </template>
      <input
        v-if="!isMaxChoice"
        type="text"
        v-model="keyword"
        :style="{ width: inputWidth }"
        :placeholder="showPlaceholder"
        @input="handleInputSearch"
        @focus="isFocus = true"
      />
    </div>

    <DropdownBox
      v-if="showDropdownBox"
      :options="options"
      :keywordName="keywordName"
      :code="code"
      :listSelected="listSelected"
      @handleSelectItem="handleSelectItem"
    />
  </div>
</template>

<script>
import DropdownBox from "./DropdownBox.vue";
import SelectedItem from "./SelectedItem.vue";
import SearchIcon from "./icons/SearchIcon.vue";

export default {
  name: "InputContainer",
  components: {
    SearchIcon,
    SelectedItem,
    DropdownBox,
  },
  props: {
    placeholder: {
      type: String,
      default: () => "Nhập tên thành phố để tìm kiếm",
    },
    options: {
      type: Array,
      default: () => [],
    },

    keywordName: {
      type: String,
      default: () => "name",
    },
    code: {
      type: String,
      default: () => "code",
    },
    maxChoice: {
      type: Number,
      required: false,
    },
    listSelected: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      keyword: "",
      isFocus: false,
    };
  },

  computed: {
    showDropdownBox() {
      return this.keyword.length && this.isFocus;
    },
    isMaxChoice() {
      return this.maxChoice && this.listSelected.length === this.maxChoice;
    },
    showPlaceholder() {
      if (!this.listSelected.length) {
        return this.placeholder;
      }
    },
    inputWidth() {
      if (this.listSelected.length) {
        // Adjust the input width based on the number of selected items
        const baseWidth = 200; // Base width for the input
        const padding = 10; // Padding for the input
        const totalSelectedWidth = this.listSelected.length * 40; // Modify this value to adjust spacing between selected items
        // Calculate the width for the input
        const width = baseWidth - totalSelectedWidth - padding;
        // Ensure the width doesn't become negative
        return width > 0 ? `${width}px` : "auto";
      }

      return "340px"; // Default width when no items are selected
    },
  },

  methods: {
    handleInputSearch() {
      this.$emit("input", this.keyword);
    },
    handleSelectItem(item) {
      if (!this.isMaxChoice) {
        this.keyword = "";
        this.isFocus = false;
        this.handleInputSearch();
        this.$emit("handleSelectItem", item);
      }
    },
    handleRemoveItem(item) {
      this.$emit("handleRemoveItem", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  display: flex;
  width: 400px;
  background: rgba(229, 249, 255, 0.2);
  border-radius: 4px;
  border: 1px solid #dbdbdb;
  position: relative;
  margin-top: 10px;
  min-height: 48px;
  padding: 8px 10px;
  gap: 10px;

  &.focus {
    border: 1px solid #1991d2;
  }
  .search-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .input-box {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;

    input {
      outline: 0;
      height: 32px;
      border: none;
      color: #333333;
      background: transparent;

      &::placeholder {
        color: #bfbfbf;
      }

      &:focus::placeholder {
        color: transparent;
      }
    }
  }
}
</style>
