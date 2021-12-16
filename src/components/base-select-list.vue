<template>
  <div :class="$style.list">
    <select-item
      v-for="item in items"
      :key="item.id"
      :title="item.name"
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