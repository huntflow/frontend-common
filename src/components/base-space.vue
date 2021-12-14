<template>
  <div :class="vertical ? $style.verticalSpacer : $style.horizontalSpacer" :style="style" />
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
    },
    vertical: Boolean
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
.horizontalSpacer {
  height: var(--size);
}

.verticalSpacer {
  width: var(--size);
}
</style>