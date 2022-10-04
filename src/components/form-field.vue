<template>
  <div :class="className">
    <form-label v-if="label" :for="id" :description="description">{{ label }}</form-label>
    <slot :id="id" />
    <form-error v-if="error" :class="$style.error">{{ error }}</form-error>
    <div v-else-if="hint" :class="$style.hint" v-html="hint" />
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
import FormLabel from './form-label.vue';
import FormError from './form-error.vue';

export default {
  name: 'HuntKitFormField',
  components: {
    FormLabel,
    FormError
  },
  props: {
    label: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    hint: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: null
    },
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
.field {
  display: flex;
  gap: 8px;
  flex-direction: column;
}

.field + .field {
  margin-top: 16px;
}

.hint {
  all: unset;

  font-size: var(--fontSizeS);
  font-family: var(--fontFamily);
  line-height: var(--lineHeightInterface);

  color: var(--inputColorTextHint);
}

.hint a {
  color: inherit;
}
</style>
