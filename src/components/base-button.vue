<template>
  <button :class="classNames" v-bind="$attrs" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
const AVAILABLE_THEMES = ['default', 'accent', 'success', 'error', 'warning'];
const AVAILABLE_PROMINENCE = ['main', 'weak', 'thin'];

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
      type: String,
      default: 'main',
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
  font-family: var(--buttonSTextFontFamily);
  text-align: center;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
}

.button:disabled {
  cursor: default;
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

/* default theme */
.t-default {
  border-color: var(--defaultBgBtnMain);
  background-color: var(--defaultBgBtnMain);
  color: var(--defaultTextBtnMain);
}
.t-default:hover {
  border-color: var(--defaultBgBtnMainHover);
  background-color: var(--defaultBgBtnMainHover);
}
.t-default:disabled {
  border-color: var(--defaultBgBtnMainDisabled);
  background-color: var(--defaultBgBtnMainDisabled);
}
.t-default:focus-visible {}

.t-default.p-weak {
  border-color: var(--defaultBorderBtnWeak);
  color: var(--defaultTextBtnWeak);
}
.t-default.p-weak:hover {
  border-color: var(--defaultBorderBtnWeakHover);
}
.t-default.p-weak:disabled {
  color: var(--defaultTextBtnWeakDisabled);
  border-color: var(--defaultBorderBtnWeakDisabled);
}
.t-default.p-weak:focus-visible {}

.t-default.p-thin {
  color: var(--defaultTextBtnThin);
  background: none;
  border-color: transparent;
}
.t-default.p-thin:hover {
  color: var(--defaultTextBtnThinHover);
  background: none;
  border-color: transparent;
}
.t-default.p-thin:disabled {
  background: none;
  border-color: transparent;
}
.t-default.p-thin:focus-visible {}

/* accent theme */
.t-accent {
  border-color: var(--accentBgBtnMain);
  background-color: var(--accentBgBtnMain);
  color: var(--accentTextBtnMain);
}
.t-accent:hover {
  border-color: var(--accentBgBtnMainHover);
  background-color: var(--accentBgBtnMainHover);
}
.t-accent:disabled {
  border-color: var(--accentBgBtnMainDisabled);
  background-color: var(--accentBgBtnMainDisabled);
}
.t-accent:focus-visible {}

.t-accent.p-weak {
  border-color: var(--accentBorderBtnWeak);
  color: var(--accentTextBtnWeak);
}
.t-accent.p-weak:hover {
  color: var(--accentTextBtnWeakHover);
  border-color: var(--accentBorderBtnWeakHover);
}
.t-accent.p-weak:disabled {
  color: var(--accentTextBtnWeakDisabled);
  border-color: var(--accentBorderBtnWeakDisabled);
}
.t-accent.p-weak:focus-visible {}


/* error theme */
.t-error {
  border-color: var(--errorBgBtnMain);
  background-color: var(--errorBgBtnMain);
  color: var(--errorTxtBtnMain);
}
.t-error:hover {
  border-color: var(--errorBgBtnMainHover);
  background-color: var(--errorBgBtnMainHover);
}
.t-error:disabled {
  border-color: var(--errorBgBtnMainDisabled);
  background-color: var(--errorBgBtnMainDisabled);
}
.t-error:focus-visible {}

.t-error.p-weak {
  border-color: var(--errorBorderBtnWeak);
  color: var(--errorTextBtnWeak);
}
.t-error.p-weak:hover {
  color: var(--errorTextBtnWeakHover);
  border-color: var(--errorBorderBtnWeakHover);
}
.t-error.p-weak:disabled {
  color: var(--errorBorderBtnWeakDisabled); /* ToDo: взять токен, когда будет */
  border-color: var(--errorBorderBtnWeakDisabled);
}
.t-error.p-weak:focus-visible {}

.t-error.p-thin {
  color: var(--errorTextBtnThin);
  background: none;
  border-color: transparent;
}
.t-error.p-thin:hover {
  color: var(--errorTxtBtnThinHover);
  background: var(--errorBgBtnThinHover);
  border-color: transparent;
}
.t-error.p-thin:disabled {
  background: none;
  border-color: transparent;
}
.t-error.p-thin:focus-visible {}

/* success theme */
.t-success {
  border-color: var(--successBgBtnMain);
  background-color: var(--successBgBtnMain);
  color: var(--successTxtBtnMain);
}
.t-success:hover {
  border-color: var(--successBgBtnMainHover);
  background-color: var(--successBgBtnMainHover);
}
.t-success:disabled {
  border-color: var(--successBgBtnMainDisabled);
  background-color: var(--successBgBtnMainDisabled);
}
.t-success:focus-visible {}

.t-success.p-weak {
  border-color: var(--successBorderBtnWeak);
  color: var(--successTextBtnWeak);
}
.t-success.p-weak:hover {
  color: var(--successTextBtnWeakHover);
  border-color: var(--successBorderBtnWeakHover);
}
.t-success.p-weak:disabled {
  color: var(--successBorderBtnWeakDisabled); /* ToDo: взять токен, когда будет */
  border-color: var(--successBorderBtnWeakDisabled);
}
.t-success.p-weak:focus-visible {}

.p-weak,
.p-weak:disabled,
.p-weak:hover {
  background: none;
}
</style>
