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

  font-size: 14px;
  font-family: 'hunt-kit-graphik', Arial, Helvetica, sans-serif;
  line-height: 18px;

  color: #cb5b61;
}
</style>