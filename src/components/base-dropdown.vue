<template>
  <div :class="{ [$style.dropdown]: true, [$style.naked]: naked }">
    <div ref="triggerPlaceholder"><slot :shown="show" :toggle="handleToggle" /></div>
    <div ref="menuPlaceholder">
      <div v-if="show" ref="menu" :class="$style.menu" :style="menuStyle">
        <slot name="menu" :shown="show" :toggle="handleToggle" />
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
    menuSize: {
      type: String,
      default: 'auto'
    },
    allowFlip: {
      type: Boolean,
      default: true
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
        l: '600px'
      };
      return {
        width: widths[this.menuSize]
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

    // this.scrollableParents = [];
    // let node = this.$refs.triggerPlaceholder;
    // while (node) {
    //   if (node.clientHeight !== node.scrollHeight) {
    //     this.scrollableParents.push(node);
    //   }
    //   node = node.parentNode;
    // }
    // this.scrollableParents.forEach((node) => {
    //   node.addEventListener('scroll', this.updatePosition, { passive: true });
    // });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.updatePosition);
    window.removeEventListener('resize', this.updatePosition);
    // this.scrollableParents.forEach((node) => {
    //   node.removeEventListener('scroll', this.updatePosition);
    // });
  },
  methods: {
    updatePosition() {
      if (!this.show) {
        return;
      }
      const trigger = this.$refs.triggerPlaceholder;
      const menu = this.$refs.menu;
      if (trigger && menu) {
        const middleware = [];
        if (this.allowFlip) {
          middleware.push(flip());
        }
        middleware.push(offset(parseInt(spaceXs)));

        computePosition(trigger, menu, {
          placement: 'bottom-start',
          // strategy: 'fixed',
          middleware
        }).then(({ x, y }) => {
          menu.style.left = `${x}px`;
          menu.style.top = `${y}px`;

          if (this.menuSize === 'full') {
            menu.style.width = trigger.getBoundingClientRect().width + 'px';
          }
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
        trigger: this.$refs.triggerPlaceholder,
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
  position: absolute;
  z-index: 1;
  left: 0;
  top: 100%;
}

.dropdown:not(.naked) .menu {
  box-shadow: var(--shadowDropdown);
  border-radius: var(--radiusM);
  background-color: var(--defaultBg);
}
</style>