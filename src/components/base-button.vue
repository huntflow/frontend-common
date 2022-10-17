<template>
  <button
    :class="{ [$style.button]: true, [$style[`button-${kind}`]]: true, [$style.buttonPreloader]: loading }"
    :type="type"
    :disabled="loading"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <base-loader v-if="loading" />
    <slot v-else />
  </button>
</template>

<script>
import BaseLoader from './base-loader.vue';

export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    kind: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'ghost'].includes(value);
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BaseLoader
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

.button-ghost {
  background-color: transparent;
  color: #9C9C9C;
}

.button-ghost:hover {
  color: #666666;
}
</style>
