<template>
  <div :class="$style.root" :style="style">
    <div :class="$style.left">
      <slot />
    </div>
    <div :class="$style.right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import * as tokens from '../tokens/tokens';
import { capitalize } from '../helpers';

export default {
  name: 'HuntKitFormFooter',
  props: {
    spacing: {
      type: String,
      default: 'xs'
    }
  },
  computed: {
    style() {
      return {
        '--spacing': tokens[`space${capitalize(this.spacing)}`]
      };
    }
  }
}
</script>

<style module>
.root {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left,
.right {
  display: flex;
  column-gap: var(--spacing);
}
</style>