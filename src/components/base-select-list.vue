<template>
  <div :class="$style.list">
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
  },
}
</script>

<style module>
.list {
  overflow-y: auto;
  max-height: 294px; /* ToDo: фикс высота элемента и расчет этого значения от этой высоты 6.5 * itemHeight */
}
</style>