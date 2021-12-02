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

  font-size: var(--inputTextFontSize);
  line-height: var(--inputTextLineHeight);
  font-weight: var(--inputTextFontWeight);
  font-family: var(--inputTextFontFamily);

  background-color: #fafcfc;
  border: 1px solid #E4E8EE;
  border-radius: var(--radiusXs);
}

.invalid {
  border-color: #C10A2C;
}

.input:focus {
  border-color: #1DA1B5;
}

.size-s {
  height: var(--inputHeightS);
  padding: 0 var(--spaceXs);
}
</style>