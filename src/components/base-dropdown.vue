<template>
  <div :class="$style.dropdown">
    <slot :show="show" :on-toggle="handleToggle" />
    <div v-if="show" :class="$style.menu">
      <slot name="menu" :show="show" :on-toggle="handleToggle" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HuntKitDropdown',
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
}
</style>