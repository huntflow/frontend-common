<template>
  <textarea v-bind="$attrs" :class="className" v-on="listeners" />
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'HuntKitTextarea',
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
        [this.$style.textarea]: true,
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
.textarea {
  all: unset;

  font-size: var(--inputTextFontSize);
  line-height: var(--inputTextLineHeight);
  font-weight: var(--inputTextFontWeight);
  font-family: var(--inputTextFontFamily);

  box-sizing: border-box;
  display: block;
  width: 100%;

  resize: vertical;
  white-space: pre;

  border: 1px solid var(--inputColorBorder);
  border-radius: var(--radiusXs);
  background-color: var(--inputColorBg);
  color: var(--inputColorText);
}

.invalid {
  border-color: var(--inputColorBorderError);
}

.textarea:focus {
  border-color: var(--inputColorBorderFocus);
}

.textarea:disabled {
  color: var(--inputColorTextDisabled);
  border-color: var(--inputColorBorder);
}

.textarea::placeholder {
  color: var(--inputColorTextPlaceholder);
}

.size-s {
  min-height: var(--inputHeightS);
  padding: var(--spaceXs);
}

.size-xs {
  min-height: var(--inputHeightXs);
  padding: var(--spaceXxs);
}
</style>