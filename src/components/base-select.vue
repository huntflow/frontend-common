<template>
  <select v-bind="$attrs" :class="className" v-on="listeners">
    <slot />
  </select>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'HuntKitSelect',
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
        [this.$style.select]: true,
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
.select {
  font: inherit;
  appearance: none;
  font-family: 'hunt-kit-graphik', Arial, Helvetica, sans-serif;
  font-size: 16px;
  line-height: 18px;

  padding: 0 40px 0 12px;
  height: 48px;
  background: #f6f6f8;
  border: 1px solid #d8d7e0;
  border-radius: 6px;

  background-image: url("data:image/svg+xml,%3Csvg width='14' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.341 7.128a1 1 0 0 0 1.317 0l5.34-4.67c.694-.609.264-1.753-.66-1.753H1.662c-.923 0-1.353 1.144-.658 1.752L6.34 7.128Z' fill='%23999'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: calc(100% - 15px) 50%;
}

.select:focus {
  outline: none;
  box-shadow: 0 0 0 3px #c4edfa;
  border-color: #29a0ba;
}

.select:disabled {
  background-color: #f6f6f8;
  border-color: #f6f6f8;
  color: #b7b7b7;
}

.select:disabled::placeholder {
  color: #d1d1d1;
}

.invalid {
  border-color: #db525e;
}

.invalid:focus {
  box-shadow: 0 0 0 3px #f5cccf;
}
</style>