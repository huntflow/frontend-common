<template>
  <div :class="{ [$style.dropdown]: true, [$style.naked]: naked }">
    <div ref="triggerPlaceholder"><slot :show="show" :on-toggle="handleToggle" /></div>
    <div ref="menuPlaceholder">
      <div v-if="show" ref="menu" :class="$style.menu" :style="menuStyle">
        <slot name="menu" :show="show" :on-toggle="handleToggle" />
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
import { spaceXs } from '../tokens/tokens';
import { computePosition, flip, offset } from '@floating-ui/dom';
import layers from '../libs/layers';


export default {
  name: 'HuntKitDropdown',
  props: {
    // disables border-radius and shadow
    naked: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'auto'
    }
  },
  data() {
    return {
      show: false,
      id: nanoid()
    };
  },
  computed: {
    menuStyle() {
      const widths = {
        s: '200px',
        m: '400px',
        l: '600px',
        full: '100%'
      };
      return {
        width: widths[this.size]
      };
    },
  },
  watch: {
    show(value) {
      if (value) {
        this.$nextTick(() => {
          this.updatePosition();
        });
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updatePosition, { passive: true });
    window.addEventListener('resize', this.updatePosition);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.updatePosition);
    window.removeEventListener('resize', this.updatePosition);
  },
  methods: {
    updatePosition() {
      const trigger = this.$refs.triggerPlaceholder.childNodes[0];
      const menu = this.$refs.menu;
      if (trigger && menu) {
        computePosition(trigger, menu, {
          placement: 'bottom-start',
          strategy: 'fixed',
          middleware: [flip(), offset(parseInt(spaceXs))]
        }).then(({ x, y }) => {
          console.log(x, y);
          menu.style.left = `${x}px`;
          menu.style.top = `${y}px`;
        });
      }
    },
    handleToggle() {
      if (this.show) {
        this.close();
      } else {
        this.open();
      }
    },
    open() {
      const layer = layers.addDropdown({
        id: this.id,
        trigger: this.$refs.triggerPlaceholder.childNodes[0],
        element: this.$refs.menuPlaceholder,
        hide: () => this.hideFromLayers()
      });

      this.show = Boolean(layer);
    },
    hideFromLayers() {
      this.show = false;
    },
    close() {
      layers.removeById(this.id);
      this.show = false;
    }
  }
}
</script>

<style module>
.dropdown {
  display: inline-block;
  position: relative;
}

.menu {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 100%;
  /* margin-top: var(--spaceXs); */
}

.dropdown:not(.naked) .menu {
  box-shadow: var(--shadowDropdown);
  border-radius: var(--radiusM);
  background-color: var(--defaultBg);
}
</style>