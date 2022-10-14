<template>
  <a :class="$style.link" v-bind="$attrs" v-on="$listeners">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'HuntKitLink'
};
</script>

<style module>
.link {
  font-size: 16px;
  line-height: 150%;
  font-family: var(hunt-kit-graphik);

  color: #1DA1B5;
  text-decoration: none;
}

.link:hover {
  color: #148B9D;
}
</style>
