<template>
  <div :class="{ [$style.root]: true, [$style.fill]: fill }">
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
    fill: {
      type: Boolean,
      default: false
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

.root:not(:first-child) {
  margin-top: 32px;
}

.left,
.right {
  display: flex;
  gap: 10px;
}

.fill .left {
  flex-direction: column;
  flex: 1;
}
</style>