<template>
  <label :class="$style.label"><slot /></label>
</template>

<script>
export default {
  name: 'HuntKitLabel'
}
</script>

<style module>
.label {
  font-size: var(--inputLabelFontSize);
  line-height: var(--inputLabelLineHeight);
  font-weight: var(--inputLabelFontWeight);
  font-family: var(--inputLabelFontFamily);
}
</style>