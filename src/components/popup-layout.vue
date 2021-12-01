<template>
  <div :class="[$style.root, $style[`size-${size}`]]">
    <div :class="$style.header">
      <h3 :class='$style.title'>{{ title }}</h3>
    </div>
    <div :class="$style.content">
      <div :class="$style.main">
        <slot />
      </div>
      <div :class="$style.side"><slot name="side" /></div>
    </div>
    <div :class="$style.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HuntKitPopupLayout',
  props: {
    size: {
      type: String,
      default: 'm'
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style module>
.root,
.header,
.title,
.content,
.main,
.side,
.footer {
  all: unset;
  font-family: var(--fontFamily);
  display: block;
  box-sizing: border-box;
  color: var(--defautPalette700);
}

.root {
  box-shadow: var(--shadowModal);
}

.content {
  display: flex;
}

.footer {
  display: flex;
}

.size-m {
  width: 768px;
  padding: var(--spaceM) var(--spaceMl);
}

.size-m .header {
  padding-bottom: var(--spaceXs);
}

.size-m .title { /* todo: использовать компонент заголовка? */
  font-family: var(--headerH2FontFamily);
  font-size: var(--headerH2FontSize);
  line-height: var(--headerH2LineHeight);
  font-weight: var(--headerH2FontWeight);
}

.size-m .content {
  border-top: 1px solid var(--defautPalette100);
  border-bottom: 1px solid var(--defautPalette100);
}

.size-m .main {
  width: 61.5%;
  padding: var(--spaceSm) var(--spaceSm) var(--spaceSm) 0;
}

.size-m .side {
  width: 38.5%;
  border-left: 1px solid var(--defautPalette100);
  padding: var(--spaceSm) 0 var(--spaceSm) var(--spaceSm);
}

.size-m .side:empty {
  display: none;
}

.size-m .footer {
  padding: var(--spaceSm) 0 0;
}

.size-m .footer > * + * {
  margin-left: var(--spaceXs);
}

.size-s {
  width: 512px;
}
</style>