<template>
  <input v-bind="$attrs" :class="className" v-on="listeners" />
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'HuntKitInput',
  model: {
    prop: 'value',
    event: 'inputValue'
  },
  props: {
    size: {
      type: String,
      default: 's'
    },
    invalid: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    className() {
      return {
        [this.$style.input]: true,
        [this.$style[`size-${this.size}`]]: true,
        [this.$style.invalid]: this.invalid,
      };
    },
    listeners() {
      return {
        ...this.$listeners,
        input: (event) => {
          this.$emit('inputValue', event.target.value);
          this.$emit('input', event);
        }
      };
    }
  }
}
</script>

<style module>
.input {
  all: unset;

  font-size: var(--inputTextFontSize);
  line-height: var(--inputTextLineHeight);
  font-weight: var(--inputTextFontWeight);
  font-family: var(--inputTextFontFamily);

  box-sizing: border-box;
  display: block;
  width: 100%;

  border: 1px solid var(--inputColorBorder);
  border-radius: var(--radiusXs);
  background-color: var(--inputColorBg);
  color: var(--inputColorText);
}

.invalid {
  border-color: var(--inputColorBorderError);
}

.input:focus {
  border-color: var(--inputColorBorderFocus);
}

.input:disabled {
  color: var(--inputColorTextDisabled);
  border-color: var(--inputColorBorder);
}

.input::placeholder {
  color: var(--inputColorTextPlaceholder);
}

.size-s {
  height: var(--inputHeightS);
  padding: 0 var(--spaceXs);
}

.size-xs {
  height: var(--inputHeightXs);
  padding: 0 var(--spaceXxs);
}
</style>