<template>
  <div>
    <base-label v-if="label" :for="id">{{ label }}</base-label>
    <slot :id="id" />
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
import BaseLabel from './base-label.vue';

export default {
  name: 'HuntKitFormField',
  components: {
    BaseLabel
  },
  props: {
    label: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      id: `field-${nanoid()}`
    };
  }
}
</script>
