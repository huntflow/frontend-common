<template>
  <div :class="$style.error"><slot /></div>
</template>

<script>
export default {
  name: 'HuntKitFormError'
}
</script>

<style module>
.error {
  all: unset;

  display: block;

  font-size: var(--fontSizeS);
  font-family: var(--fontFamily);
  line-height: var(--lineHeightInterface);

  color: var(--inputTextError);
}
</style>