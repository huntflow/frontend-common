<template>
  <div :class="$style.list" tabindex="-1" ref="root" @keydown="handleKeydown">
    <select-item
      v-for="item in items"
      :key="item.id"
      :title="item.name"
      :active="isActive(item)"
      @click="handleSelect(item);"
    />
  </div>
</template>

<script>
import SelectItem from './base-select-item.vue';

export default {
  name: 'HuntKitSelectList',
  model: {
    prop: 'value',
    event: 'input',
  },
  components: {
    SelectItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: [Number, String],
      default: null,
    }
  },
  methods: {
    isActive(item) {
      if (Array.isArray(this.value)) {
        return this.value.includes(item.id);
      }

      return item.id === this.value;
    },
    handleSelect(item) {
      this.$emit('input', item.id);
    },
    focus() {
      this.$refs.root.focus();
    },
    handleKeydown(e) {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
        return;
      }

      e.preventDefault();

      const forward = e.key !== 'ArrowUp';
      const focused = this.$refs.root.querySelector('*:focus');
      if (focused) {
        const nextToFocus = forward ? focused.nextSibling : focused.previousSibling;
        if (nextToFocus) {
          nextToFocus.focus();
        } else {
          const index = forward ? 0 : this.$refs.root.childNodes.length - 1;
          this.$refs.root.childNodes[index].focus();
        }
      } else {
        this.$refs.root.childNodes[0].focus();
      }
    }
  },
}
</script>

<style module>
.list {
  outline: none;
  overflow-y: auto;
  max-height: 294px; /* ToDo: фикс высота элемента и расчет этого значения от этой высоты 6.5 * itemHeight */
}
</style>