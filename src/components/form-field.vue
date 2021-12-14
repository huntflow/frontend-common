<template>
  <div :class="className">
    <template v-if="label">
      <base-label :for="id">{{ label }}</base-label>
      <base-space size="xxs" />
    </template>
    <slot :id="id" />
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
import BaseLabel from './base-label.vue';
import BaseSpace from './base-space.vue';

export default {
  name: 'HuntKitFormField',
  components: {
    BaseLabel,
    BaseSpace
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
  },
  computed: {
    className() {
      return {
        [this.$style.field]: true,
        [this.$style.labeled]: Boolean(this.label)
      };
    }
  }
}
</script>

<style module>
.field + .field {
  margin-top: var(--spaceS);
}

.field + .labeled {
  margin-top: var(--spaceSm);
}
</style>
