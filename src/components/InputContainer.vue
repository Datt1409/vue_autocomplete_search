<template>
  <div class="container">
    <div class="search-icon">
      <SearchIcon />
    </div>

    <div class="input-box">
      <template v-if="listSelected.length">
        <SelectedItem
          v-for="item in listSelected"
          :key="item[keyValue]"
          :keyLabel="keyLabel"
          :item="item"
          @handleRemoveItem="handleRemoveItem(item)"
        />
      </template>
      <input
        v-if="!isMaxChoice"
        type="text"
        v-model="keyword"
        :class="{ 'not-empty': shrinkInput }"
        :placeholder="showPlaceholder"
        @input="handleInputSearch"
        @focus="isFocus = true"
      />
    </div>

    <DropdownBox
      v-if="showDropdownBox"
      :options="options"
      :keyLabel="keyLabel"
      :keyValue="keyValue"
      :listSelected="listSelected"
      @handleSelectItem="handleSelectItem"
    />
  </div>
</template>

<script>
import SearchIcon from "@/components/icons/SearchIcon.vue";
import DropdownBox from "@/components/DropdownBox.vue";
import SelectedItem from "@/components/SelectedItem.vue";

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

    keyLabel: {
      type: String,
      default: () => "name",
    },
    keyValue: {
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
    shrinkInput() {
      return this.listSelected.length;
    },
    isMaxChoice() {
      return this.maxChoice && this.listSelected.length === this.maxChoice;
    },
    showPlaceholder() {
      if (!this.listSelected.length) {
        return this.placeholder;
      }
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
      width: 330px;

      &::placeholder {
        color: #bfbfbf;
      }

      &:focus::placeholder {
        color: transparent;
      }
      &.not-empty {
        width: 80px;
      }
    }
  }
}
</style>
