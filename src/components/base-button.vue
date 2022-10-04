<template>
  <button
    :class="{ [$style.button]: true, [$style.buttonPreloader]: loading }"
    :type="type"
    :disabled="loading"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <svg
      v-if="loading"
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
    <slot v-else />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style module>

.button {
  font-size: 16px;
  line-height: 18px;
  font-weight: 500;

  height: 48px;
  padding: 16px 12px;

  font-family: 'hunt-kit-graphik', Arial, Helvetica, sans-serif;

  color: #fff;
  border: 0;
  background-color: #1d1d1f;
  border-radius: 6px;

  cursor: pointer;
}

.button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px #d8d8e5;
}

.button:active {
  box-shadow: 0 0 0 4px #d8d8e5;
}

.button:disabled {
  background-color: #2f2f31;
  color: #9c9c9c;
  cursor: default;
}

.buttonPreloader:disabled {
  background-color: #1d1d1f;
  cursor: default;
}

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
