<template>
  <button :class="$style.button" v-bind="$attrs" v-on="$listeners"><slot /></button>
</template>

<script>
export default {
  name: 'HFBaseButton'
};
</script>

<style module>
.button {
  all: unset;
  box-sizing: border-box;
  height: 40px; /* derrive from tokens */
  padding: 10px 20px; /* derrive from tokens */
  font-family: sans-serif; /* token */
  font-size: 20px; /* token */
  color: #fff; /* token? */
  background-color: #0cf; /* token? */
  text-align: center;
}
</style>
