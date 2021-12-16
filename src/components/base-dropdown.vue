<template>
  <div :class="{ [$style.dropdown]: true, [$style.naked]: naked }">
    <slot :show="show" :on-toggle="handleToggle" />
    <div v-if="show" :class="$style.menu">
      <slot name="menu" :show="show" :on-toggle="handleToggle" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HuntKitDropdown',
  props: {
    // disables border-radius and shadow
    naked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleToggle() {
      this.show = !this.show;
    }
  }
}
</script>

<style module>
.dropdown {
  position: relative;
}

.menu {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  margin-top: var(--spaceXs);
}

.dropdown:not(.naked) .menu {
  box-shadow: var(--shadowDropdown);
  border-radius: var(--radiusM);
}
</style>