<template>
  <div :class="$style.root" :style="style">
    <div :class="$style.left">
      <slot />
    </div>
    <div :class="$style.right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HuntKitFormFooter',
  props: {
    spacing: {
      type: String,
      default: 'xs'
    }
  },
  computed: {
    style() {
      return {
        '--spacing': 10
      };
    }
  }
}
</script>

<style module>
.root {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left,
.right {
  display: flex;
  column-gap: var(--spacing);
}
</style>