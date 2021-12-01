<template>
  <div :class="[$style.root, $style[`size-${size}`]]">
    <div :class="$style.header">
      <base-heading :level="3" size="2">{{ title }}</base-heading>
    </div>
    <div :class="$style.content">
      <div :class="$style.main">
        <slot />
      </div>
      <div v-if="size === 'm'" :class="$style.side"><slot name="side" /></div>
    </div>
    <div :class="$style.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import BaseHeading from './heading.vue';

export default {
  name: 'HuntKitPopupLayout',
  components: { BaseHeading },
  props: {
    size: {
      type: String,
      default: 'm'
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style module>
.root,
.header,
.content,
.main,
.side,
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
  box-shadow: var(--shadowModal);
  border-radius: var(--radiusM);
}

.content {
  display: flex;
}

.footer {
  display: flex;
}

.size-m {
  width: 768px;
  padding: var(--spaceM) var(--spaceMl);
}

.size-m .header {
  padding-bottom: var(--spaceXs);
}

.size-m .content {
  border-top: 1px solid var(--defaultPalette100);
  border-bottom: 1px solid var(--defaultPalette100);
}

.size-m .main {
  width: 61.5%;
  padding: var(--spaceSm) var(--spaceSm) var(--spaceSm) 0;
}

.size-m .side {
  width: 38.5%;
  border-left: 1px solid var(--defaultPalette100);
  padding: var(--spaceSm) 0 var(--spaceSm) var(--spaceSm);
}

.size-m .side:empty {
  display: none;
}

.size-m .footer {
  padding: var(--spaceSm) 0 0;
}

.size-m .footer > * + * {
  margin-left: var(--spaceXs);
}

.size-s {
  width: 512px;
  padding: var(--spaceM) var(--spaceMl);
}

.size-s .header {
  padding-bottom: var(--spaceSm);
}

.size-s .footer {
  padding-top: var(--spaceS);
}

.size-s .footer > * + * {
  margin-left: var(--spaceXs);
}
</style>