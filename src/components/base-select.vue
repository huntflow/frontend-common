<template>
  <base-dropdown>
    <template #default="{ onToggle }">
      <button :class="className" v-on="listeners" @click="onToggle">
        <template v-if="displayValue">
          {{ displayValue }}
        </template>
        <template v-else>
          <span :class="$style.placeholder">{{ placeholder }}</span>
        </template>
      </button>
    </template>
    <template #menu="{ onToggle }">
      <ul>
        <li v-for="item in items" :key="item.id" @click="handleSelect(item); onToggle();">
          {{ item.name }}
        </li>
      </ul>
    </template>
  </base-dropdown>
</template>

<script>
import BaseDropdown from './base-dropdown.vue';

export default {
  inheritAttrs: false,
  name: 'HuntKitSelect',
  model: {
    prop: 'value',
    event: 'input'
  },
  components: {
    BaseDropdown
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
    items: {
      type: Array,
      required: true
    },
    value: {
      type: [Number, String],
      default: null
    },
    placeholder: {
      type: String,
      default: null
    }
  },
  computed: {
    displayValue() {
      if (this.value === null) {
        return;
      }

      return this.items.find((v) => v.id === this.value)?.name;
    },
    className() {
      return {
        [this.$style.selectButton]: true,
        [this.$style[`size-${this.size}`]]: true,
        [this.$style.invalid]: this.invalid,
      };
    },
    listeners() {
      return {
        ...this.$listeners
      };
    }
  },
  methods: {
    handleSelect(item) {
      this.$emit('input', item.id);
    }
  }
}
</script>

<style module>
.selectButton {
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

.selectButton:focus-visible {
  border-color: var(--inputColorBorderFocus);
}

.selectButton:disabled {
  color: var(--inputColorTextDisabled);
  border-color: var(--inputColorBorder);
}

.placeholder {
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