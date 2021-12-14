<template>
  <div :class="$style.spacer" :style="style" />
</template>

<script>
import { capitalize } from '../helpers';
import * as tokens from '../tokens/tokens';

export default {
  name: 'HuntKitSpacer',
  props: {
    size: {
      type: String,
      required: true
    }
  },
  computed: {
    style() {
      return {
        '--size': tokens[`space${capitalize(this.size)}`]
      };
    }
  }
}
</script>

<style module>
.spacer {
  width: var(--size);
  height: var(--size);
}
</style>