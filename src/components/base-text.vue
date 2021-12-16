<template>
  <component :is="tag" :class="secondary ? $style.secondary : $style.text"
    ><slot
  /></component>
</template>

<script>
export default {
  name: 'HuntKitText',
  props: {
    tag: {
      type: String,
      default: 'span',
    },
    secondary: Boolean,
  },
};
</script>

<style module>
.text {
  all: unset;

  font-size: var(--headerBaseTextFontSize);
  line-height: var(--headerBaseTextLineHeight);
  font-weight: var(--headerBaseTextFontWeight);
  font-family: var(--headerBaseTextFontFamily);
}

.secondary {
  composes: text;

  font-size: var(--headerSecondaryTextFontSize);
  line-height: var(--headerSecondaryTextLineHeight);
  font-weight: var(--headerSecondaryTextFontWeight);
  font-family: var(--headerSecondaryTextFontFamily);
}
</style>
