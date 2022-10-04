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
    invalid: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    className() {
      return {
        [this.$style.input]: true,
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
  font: inherit;
  font-family: 'hunt-kit-graphik', Arial, Helvetica, sans-serif;
  font-size: 16px;
  line-height: 18px;

  padding: 0 12px;
  height: 48px;
  background: #f6f6f8;
  border: 1px solid #d8d7e0;
  border-radius: 6px;
}

.input:focus {
  outline: none;
  box-shadow: 0 0 0 3px #c4edfa;
  border-color: #29a0ba;
}

.input:disabled {
  background-color: #f6f6f8;
  border-color: #f6f6f8;
  color: #b7b7b7;
}

.input:disabled::placeholder {
  color: #d1d1d1;
}

.invalid {
  border-color: #db525e;
}

.invalid:focus {
  box-shadow: 0 0 0 3px #f5cccf;
}
</style>