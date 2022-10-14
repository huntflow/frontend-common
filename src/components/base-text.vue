<template>
  <component :is="tag" :class="[$style.text, $style[`text-${kind}`]]" :style="style"
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
    kind: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'ui', 'ui-secondary'].includes(value);
      }
    },
    weight: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'medium', 'bold'].includes(value);
      }
    }
  },
  computed: {
    style() {
      const weights = {
        normal: 400,
        medium: 500,
        bold: 600
      };
      return {
        'font-weight': weights[this.weight]
      };
    }
  }
};
</script>

<style module>
.text {
  all: unset;
  font-family: var(--hunt-kit-font-family);

  font-size: 16px;
  line-height: 24px;
}

.text p {
  margin: 0;
}

.text p + p {
  margin-top: 8px;
}

.text-ui {
  line-height: 18px;
}

.text-ui-secondary {
  font-size: 14px;
  line-height: 18px;
}
</style>
