<template>
  <div :class="$style.row"><slot /></div>
</template>

<script>
export default {
  name: 'HFFormRow'
}
</script>

<style module>
.row + .row {
  margin-top: 20px;
}
</style>
