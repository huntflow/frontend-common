<template>
  <div :class="$style.popup">
    <header :class="$style.header">
      <base-heading
        :class="$style.title"
        :level="2"
        :size="1"
      >
        {{ title }}
      </base-heading>
      <base-heading
        v-if="subtitle"
        :class="$style.subtitle"
        :level="3"
        :size="4"
      >
        {{ subtitle }}
      </base-heading>
    </header>

    <div :class="$style.content"><slot /></div>

    <footer :class="$style.footer"><slot name="footer" /></footer>
  </div>
</template>

<script>
import BaseHeading from './base-heading.vue';

export default {
  name: 'HuntKitPopupLayout',
  components: { BaseHeading },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: null,
    },
  },
};
</script>

<style module>
.popup {
  width: 400px;
  padding: 56px;
  background-color: #fff;
  border-radius: 20px;
}

.header {
  margin-bottom: 32px;
}

.title + .subtitle {
  margin-top: 8px;
}

.content + .footer:not(:empty) {
  margin-top: 32px;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
