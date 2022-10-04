<template>
  <label :class="$style.label">
    <slot />
    <template v-if="description">
      <div :class="$style.description">{{ description }}</div>
    </template>
  </label>
</template>

<script>
export default {
  name: 'HuntKitFormLabel',
  props: {
    description: {
      type: String,
      default: null
    }
  }
}
</script>

<style module>
.label {
  all: unset;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  font-family: 'hunt-kit-graphik', Arial, Helvetica, sans-serif;
  cursor: default;
}

.description {
}
</style>