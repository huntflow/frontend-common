<template>
  <div :class="vertical ? $style.verticalSpacer : $style.horizontalSpacer" :style="style" />
</template>

<script>
export default {
  name: 'HuntKitSpacer',
  props: {
    size: {
      type: String,
      required: true
    },
    vertical: Boolean
  },
  computed: {
    style() {
      return {
        '--size': 10
      };
    }
  }
}
</script>

<style module>
.horizontalSpacer {
  height: var(--size);
}

.verticalSpacer {
  width: var(--size);
}
</style>