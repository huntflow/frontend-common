<template>
  <div :class="$style.root">
    <div :class="$style.header">
      <base-heading :level="3" size="3">{{ title }}</base-heading>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    <div :class="$style.content">
      <slot />
    </div>
    <div :class="$style.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import BaseHeading from './heading.vue';

export default {
  name: 'HuntKitDropdownLayout',
  components: { BaseHeading},
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    },
  }
}
</script>

<style module>
.root,
.header,
.header p,
.content,
.footer {
  all: unset;
  display: block;
  box-sizing: border-box;

  line-height: var(--headerBaseTextLineHeight);
  font-size: var(--headerBaseTextFontSize);
  font-weight: var(--headerBaseTextFontWeight);
  font-family: var(--headerBaseTextFontFamily);
  color: var(--defaultPalette700);
}

.root {
  box-shadow: var(--shadowDropdown);
  border-radius: var(--radiusM);
}

.header {
  padding: var(--spaceSm) var(--spaceSm) var(--spaceXs) var(--spaceSm);
  border-bottom: 1px solid var(--defaultPalette100);
}

.header p {
  color: var(--defaultPalette300);
}

.content {
  padding: var(--spaceS) var(--spaceSm) 0 var(--spaceSm);
}

.footer {
  padding: var(--spaceSm);
}

.footer > * + * {
  margin-left: var(--spaceXs);
}
</style>