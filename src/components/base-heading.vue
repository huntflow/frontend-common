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
  all: unset;
  font-family: var(--hunt-kit-font-family);
  display: block;
}

.size-1 {
  font-weight: 600;
  font-size: 30px;
  line-height: 115%;
}

.size-2 {
  font-weight: 600;
  font-size: 24px;
  line-height: 130%;
}

.size-3 {
}

.size-4 {
}

.size-5 {
}

.size-6 {
}
</style>
