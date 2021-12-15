<template>
  <label :class="$style.label">
    <slot />
    <template v-if="description">
      <div :class="$style.description">{{ description }}</div>
    </template>
    <base-space size="xxs" />
  </label>
</template>

<script>
import BaseSpace from './base-space.vue';

export default {
  name: 'HuntKitFormLabel',
  components: {
    BaseSpace
  },
  props: {
    description: {
      type: String,
      default: null
    }
  }
}
</script>

<style module>
.label {
  all: unset;
  font-size: var(--inputLabelFontSize);
  line-height: var(--inputLabelLineHeight);
  font-weight: var(--inputLabelFontWeight);
  font-family: var(--inputLabelFontFamily);
  cursor: default;
}

.description {
  all: unset;
  display: block;
  font-size: var(--headerSecondaryTextFontSize);
  line-height: var(--headerSecondaryTextLineHeight);
  font-weight: var(--headerSecondaryTextFontWeight);
  font-family: var(--headerSecondaryTextFontFamily);
  color: var(--inputTextHint);
}
</style>