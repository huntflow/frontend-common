<template>
  <base-dropdown
    :class="$style.dropdown"
    menu-size="full"
    naked
    @change="handleDropdownChange"
  >
    <template #default="{ toggle, shown }">
      <button
        ref="button"
        :class="[
          className,
          {
            [$style.open]: shown,
          },
        ]"
        :disabled="disabled"
        @click="toggle"
      >
        <span :class="displayValue ? $style.value : $style.placeholder">
          {{ displayValue || placeholder }}
        </span>

        <svg
          width="8"
          height="6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          :class="$style.icon"
        >
          <path
            d="M6.86496 0H1.13504C.287204 0-.175954.988856.366819 1.64018L3.23178 5.07813c.39979.47976 1.13665.47976 1.53644.00001l2.86496-3.43796C8.17595.988857 7.7128 0 6.86496 0Z"
          />
        </svg>
      </button>
    </template>
    <template #menu="{ toggle }">
      <div :class="$style.menu">
        <select-list
          ref="list"
          :items="items"
          :value="value"
          @input="
            $emit('input', $event);
            toggle();
          "
        />
      </div>
    </template>
  </base-dropdown>
</template>

<script>
import BaseDropdown from './base-dropdown.vue';
import SelectList from './base-select-list.vue';

export default {
  inheritAttrs: false,
  name: 'HuntKitSelect',
  model: {
    prop: 'value',
    event: 'input',
  },
  components: {
    BaseDropdown,
    SelectList,
  },
  props: {
    size: {
      type: String,
      default: 's',
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: [Number, String],
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    disabled: Boolean,
  },
  computed: {
    displayValue() {
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
        ...this.$listeners,
      };
    },
  },
  methods: {
    handleSelect(item) {
      this.$emit('input', item.id);
    },
    handleDropdownChange(isOpened) {
      if (isOpened) {
        this.$nextTick(() => {
          this.$refs.list?.focus?.();
        });
      } else {
        this.$refs.button?.focus?.();
      }
    },
  },
};
</script>

<style module>
.dropdown {
  display: block;
}

.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.icon path {
  fill: var(--defaultIcon);
}

.value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
  user-select: none;
}

.selectButton {
  all: unset;

  font-size: var(--inputTextFontSize);
  line-height: var(--inputTextLineHeight);
  font-weight: var(--inputTextFontWeight);
  font-family: var(--inputTextFontFamily);

  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  border: 1px solid var(--inputColorBorder);
  border-radius: var(--radiusXs);
  background-color: var(--inputColorBg);
  color: var(--inputColorText);
}

.invalid {
  border-color: var(--inputColorBorderError);
}

.selectButton:focus-visible,
.open {
  border-color: var(--inputColorBorderFocus);
}

.selectButton:disabled {
  color: var(--inputColorTextDisabled);
  border-color: var(--inputColorBorder);
}

.placeholder {
  composes: value;
  color: var(--inputColorTextPlaceholder);
}

.size-s {
  height: var(--inputHeightS);
  padding: 0 calc(var(--spaceS) + 20px) 0 var(--spaceXs);
}

.size-s .icon {
  right: var(--spaceS);
}

.size-xs {
  height: var(--inputHeightXs);
  padding: 0 calc(var(--spaceXs) + 20px) 0 var(--spaceXxs);
}

.size-xs .icon {
  right: var(--spaceXs);
}

.menu {
  background-color: #fff;
  border-radius: var(--radiusXs);
  box-shadow: 0px 0px 15px rgba(60, 64, 85, 0.15);
}
</style>
