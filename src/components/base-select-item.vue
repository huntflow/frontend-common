<template>
  <div :class="$style.item" v-bind="$attrs" v-on="$listeners">
    <base-text>{{ title }}</base-text>
  </div>
</template>

<script>
import BaseText from './base-text.vue';

export default {
  name: 'HuntKitSelectItem',
  components: { BaseText },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    }
  }
}
</script>

<style module>
.item {
  position: relative;
  padding: var(--spaceS);
  color: var(--defaultText);
  cursor: default;
  user-select: none;
}

.item:hover {
  background-color: var(--defaultBgStrong);
}

.item + .item::before {
  content: '';
  position: absolute;
  left: var(--spaceS);
  right: var(--spaceS);
  top: 0;
  height: 1px;
  background-color: var(--defaultDivider);
}
</style>