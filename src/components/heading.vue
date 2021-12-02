<template>
  <component :is="tagName" :class="$style[`size-${size}`]" v-bind="$attrs">
    <slot />
  </component>
</template>

<script>
const sizes = ['1', '2', '3', '4', '5', '6', 'display'];

export default {
  inheritAttrs: false,
  name: 'HuntKitHeading',
  props: {
    size: {
      type: String,
      required: true,
      validator(value) {
        return sizes.includes(value);
      },
    },
    level: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 1 && value <= 6;
      },
    },
  },
  computed: {
    tagName() {
      return `h${this.level}`;
    },
  },
};
</script>

<style module>
.size-display {
  all: unset;
  font-family: var(--headerDisplayFontFamily);
  font-size: var(--headerDisplayFontSize);
  font-weight: var(--headerDisplayFontWeight);
  line-height: var(--headerDisplayLineHeight);
}

.size-1 {
  all: unset;
  font-family: var(--headerH1FontFamily);
  font-size: var(--headerH1FontSize);
  font-weight: var(--headerH1FontWeight);
  line-height: var(--headerH1LineHeight);
}

.size-2 {
  all: unset;
  font-family: var(--headerH2FontFamily);
  font-size: var(--headerH2FontSize);
  font-weight: var(--headerH2FontWeight);
  line-height: var(--headerH2LineHeight);
}

.size-3 {
  all: unset;
  font-family: var(--headerH3FontFamily);
  font-size: var(--headerH3FontSize);
  font-weight: var(--headerH3FontWeight);
  line-height: var(--headerH3LineHeight);
}

.size-4 {
  all: unset;
  font-family: var(--headerH4FontFamily);
  font-size: var(--headerH4FontSize);
  font-weight: var(--headerH4FontWeight);
  line-height: var(--headerH4LineHeight);
}

.size-5 {
  all: unset;
  font-family: var(--headerH5FontFamily);
  font-size: var(--headerH5FontSize);
  font-weight: var(--headerH5FontWeight);
  line-height: var(--headerH5LineHeight);
}

.size-6 {
  all: unset;
  font-family: var(--headerH6FontFamily);
  font-size: var(--headerH6FontSize);
  font-weight: var(--headerH6FontWeight);
  line-height: var(--headerH6LineHeight);
}
</style>
