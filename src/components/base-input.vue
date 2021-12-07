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
      type: String,
      default: 's'
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

  box-sizing: border-box;
  display: block;
  width: 100%;

  border: 1px solid var(--inputBorder);
  border-radius: var(--radiusXs);
  background-color: var(--inputBg);
}

.invalid {
  border-color: var(--inputBorderError);
}

.input:focus {
  border-color: var(--inputBorderFocus);
}

.input:disabled {
  color: var(--inputTextDisabled);
  border-color: var(--inputBorder);
}

.input::placeholder {
  color: var(--inputTextPlaceholder);
}

.size-s {
  font-size: var(--buttonSTextFontSize);
  line-height: var(--buttonSTextLineHeight);
  font-weight: var(--buttonSTextFontWeight);
  font-family: var(--buttonSTextFontFamily);
  height: var(--inputHeightS);
  padding: 0 var(--spaceXs);
}

.size-xs {
  font-size: var(--buttonXsTextFontSize);
  line-height: var(--buttonXsTextLineHeight);
  font-weight: var(--buttonXsTextFontWeight);
  font-family: var(--buttonXsTextFontFamily);
  height: var(--inputHeightXs);
  padding: 0 var(--spaceXxs);
}
</style>