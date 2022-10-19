<template>
  <component
    :is="tagName"
    :class="{ [$style.heading]: true, [$style[`size-${size}`]]: true }"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'HuntKitHeading',
  props: {
    level: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 1 && value <= 6;
      },
    },
    size: {
      type: Number,
      default(props) {
        return props ? props.level : this.level;
      },
      validator(value) {
        return value >= 1 && value <= 6;
      },
    },
  },
  computed: {
    tagName() {
      return `h${this.level}`;
    }
  },
};
</script>

<style module>
.heading {
  margin: 0;
  font-family: var(--hunt-kit-font-family);
  display: block;
}

.size-1 {
  composes: heading1 from './common-text.module.css';
}

.size-2 {
  composes: heading2 from './common-text.module.css';
}

.size-3 {
  composes: heading3 from './common-text.module.css';
}

.size-4 {
  composes: heading4 from './common-text.module.css';
}

.size-5 {
}

.size-6 {
}
</style>
