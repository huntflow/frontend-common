<template>
  <div :class="$style.stack" :style="style"><slot /></div>
</template>

<script>
export default {
  name: 'HuntKitStack',
  props: {
    direction: {
      type: String,
      default: 'column'
    },
    gap: {
      type: String,
      default: '5px',
    },
  },
  computed: {
    style() {
      return {
        '--stack-gap': this.gap,
        'flex-direction': this.direction
      };
    }
  }
};
</script>

<style module>
.stack {
  display: flex;
}

.stack > * + * {
  margin-top: var(--stack-gap);
}
</style>
