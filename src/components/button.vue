<template>
  <button :class="classNames" :style="style" v-bind="$attrs" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
const AVAILABLE_THEMES = ['default', 'accent', 'success', 'error', 'warning'];
const AVAILABLE_PROMINENCE = ['primary', 'secondary', 'weak'];

export default {
  name: 'HFBaseButton',
  props: {
    size: {
      type: String,
      default: 's',
    },
    theme: {
      type: String,
      default: 'default',
      validator(value) {
        return AVAILABLE_THEMES.includes(value);
      },
    },
    prominence: {
      // todo: придумать с дизами нормальное слово
      type: String,
      default: 'weak',
      validator(value) {
        return AVAILABLE_PROMINENCE.includes(value);
      },
    },
  },
  computed: {
    classNames() {
      return [
        this.$style.button,
        this.$style[`size-${this.size}`],
        this.$style[`t-${this.theme}`],
        this.$style[`p-${this.prominence}`],
      ];
    },
  },
};
</script>

<style module>
.button {
  all: unset;
  box-sizing: border-box;
  font-family: sans-serif; /* token */
  text-align: center;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
}

.size-xs {
  font-size: var(--buttonXsTextFontSize);
  font-weight: var(--buttonXsTextFontWeight);
  line-height: var(--buttonXsTextLineHeight);
  padding: 0 var(--spaceS);
  height: var(--inputHeightXs);
  border-radius: var(--radiusXs);
}

.size-s {
  font-size: var(--buttonSTextFontSize);
  font-weight: var(--buttonSTextFontWeight);
  line-height: var(--buttonSTextLineHeight);
  padding: 0 var(--spaceSm);
  height: var(--inputHeightS);
  border-radius: var(--radiusXs);
}

.t-default {
  border-color: var(--defaultBorderBtn);
  background-color: var(--defaultBgBtn);
  color: var(--defaultTextBtn);
}
.t-default:hover {
  border-color: var(--defaultBorderBtnHover);
  background-color: var(--defaultBgBtnHover);
  color: var(--defaultTextBtnHover);
}
.t-default:disabled {
  border-color: var(--defaultBorderBtnDisabled);
  background-color: var(--defaultBgBtnDisabled);
  color: var(--defaultTextBtnDisabled);
}
.t-default:focus {
  border-color: var(--defaultBorderBtnActive);
  background-color: var(--defaultBgBtnActive);
  color: var(--defaultTextBtnActive);
}

.t-default.p-weak {
  border-color: var(--defaultBorderBtnWeak);
  background-color: var(--defaultBgBtnWeak);
  color: var(--defaultTextBtnWeak);
}
.t-default.p-weak:hover {
  border-color: var(--defaultBorderBtnWeakHover);
  background-color: var(--defaultBgBtnWeakHover);
  color: var(--defaultTextBtnWeakHover);
}

.t-accent {
  border-color: var(--accentBorderBtn);
  background-color: var(--accentBgBtn);
  color: var(--accentTextBtn);
}
.t-accent:hover {
  border-color: var(--accentBorderBtnHover);
  background-color: var(--accentBgBtnHover);
  color: var(--accentTextBtnHover);
}
.t-accent:disabled {
  border-color: var(--accentBorderBtnDisabled);
  background-color: var(--accentBgBtnDisabled);
  color: var(--accentTextBtnDisabled);
}
.t-accent:focus {
  border-color: var(--accentBorderBtnActive);
  background-color: var(--accentBgBtnActive);
  color: var(--accentTextBtnActive);
}
</style>
