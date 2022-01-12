<template>
  <div :class="$style.item" v-bind="$attrs" v-on="$listeners">
    <base-text :class="$style.text" :title="title">{{ title }}</base-text>

    <svg v-if="active" :class="$style.activeMark" width="16" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.8574.384085c.7577.585836.86 1.630645.2287 2.333645L6.74972 12l-5.6652-4.7788C.35478 6.60563.301001 5.5577.964404 4.88058c.663406-.67712 1.792766-.72702 2.522516-.11146l2.9062 2.45149L12.3424.596235c.6314-.703002 1.7574-.797985 2.515-.21215Z"
        fill="currentColor"
      />
    </svg>
  </div>
</template>

<script>
import BaseText from './base-text.vue';

export default {
  name: 'HuntKitSelectItem',
  components: { BaseText },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style module>
.item {
  position: relative;
  padding: var(--spaceS);
  padding-right: calc(var(--spaceS) * 2 + var(--spaceXxs));
  color: var(--defaultText);
  cursor: default;
  user-select: none;
}

.item:hover {
  background-color: var(--defaultBgStrong);
}

.item + .item::before {
  content: '';
  position: absolute;
  left: var(--spaceS);
  right: var(--spaceS);
  top: 0;
  height: 1px;
  background-color: var(--defaultDivider);
}

.text {
  display: block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activeMark {
  position: absolute;
  right: calc(var(--spaceXxs) + var(--spaceS));
  top: 50%;
  transform: translateY(-50%);
  color: var(--accentIcon);
}
</style>
