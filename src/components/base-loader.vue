<template>
  <svg
    :class="$style.spinner"
    width="20"
    height="20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity=".5"
      d="M10 1a8.983 8.983 0 0 0-7 3.343A9 9 0 1 0 19 10c0-1.052-.18-2.062-.512-3a8.996 8.996 0 0 0-1.821-3.046"
      stroke="#9C9C9C"
      stroke-width="1.5"
    />
  </svg>
</template>

<script>
export default {
  name: 'HuntKitLoader'
};
</script>

<style module>
@keyframes spinner-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner {
  display: block;
  margin: 0 auto;
  fill: none;
  stroke-width: 1px;
  stroke-dasharray: 170px;
  animation-name: spinner-animation;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  animation-timing-function: linear;
}
</style>
