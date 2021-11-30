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
}

.size-xs {
  font-size: var(--buttonXsTextFontSize);
  line-height: var(--buttonXsTextLineHeight);
  padding: 0 var(--spaceS);
  height: var(--inputHeightXs);
  border-radius: var(--radiusXs);
}

.size-s {
  font-size: var(--buttonSTextFontSize);
  line-height: var(--buttonSTextLineHeight);
  padding: 0 var(--spaceSm);
  height: var(--inputHeightS);
  border-radius: var(--radiusXs);
}

.t-accent {
  background-color: var(--accentBgBtn);
  color: var(--accentTextBtn);
}
.t-accent:hover {
  background-color: var(--accentBgBtnHover);
  color: var(--accentTextBtnHover);
}
.t-accent:disabled {
  background-color: var(--accentBgBtnDisabled);
  color: var(--accentTextBtnDisabled);
}
.t-accent:focus {
  background-color: var(--accentBgBtnActive);
  color: var(--accentTextBtnActive);
}

.t-default {
  border: 1px solid var(--defaultBorderBtn);
  background-color: var(--defaultBgBtn);
  color: var(--defaultTextBtn);
}
.t-default:hover {
  background-color: var(--defaultBgBtnHover);
  color: var(--defaultTextBtnHover);
}

.t-default.p-weak {
  border: 1px solid var(--defaultBorderBtnWeak);
  background-color: var(--defaultBgBtnWeak);
  color: var(--defaultTextBtnWeak);
}
.t-default.p-weak:hover {
  background-color: var(--defaultBgBtnWeakHover);
  color: var(--defaultTextBtnWeakHover);
}
</style>
