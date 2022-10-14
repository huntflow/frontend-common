<template>
  <div :class="{ [$style.npsRating]: true, [$style.withValue]: hasValue }">
    <div :class="$style.scale">
      <button
        v-for="i in scale"
        :key="i"
        :class="{ [$style.button]: true, [$style.selected]: i === value }"
        @click="$emit('input', i)"
      >
        {{ i }}
      </button>
    </div>
    <div :class="$style.labels">
      <div v-if="bottomLabel" :class="$style.label">{{ bottomLabel }}</div>
      <div v-if="topLabel" :class="$style.label">{{ topLabel }}</div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  name: 'NPSRating',
  props: {
    bottomLabel: {
      type: String,
      default: null,
    },
    topLabel: {
      type: String,
      default: null,
    },
    scale: {
      type: Number,
      default: 10,
    },
    value: {
      type: Number,
      default: null,
    },
  },
  computed: {
    hasValue() {
      return this.value !== null;
    },
  },
};
</script>

<style module>
.npsRating {
  all: unset;

  display: block;
  width: fit-content;

  font-family: var(--hunt-kit-font-family);
  font-size: 14px;
  line-height: 18px;
}

.scale {
  display: flex;
  margin-left: -3px;
  margin-right: -3px;
}

.button {
  all: unset;

  position: relative;

  font-size: 16px;
  line-height: 18px;
  font-family: var(--hunt-kit-font-family);

  width: 40px;
  height: 34px;
  text-align: center;
  cursor: pointer;
}

.button::before {
  z-index: -1;
  content: '';
  position: absolute;
  left: 3px;
  top: 0;
  bottom: 0;
  right: 3px;
  border-radius: 50%;
  border: 1px solid #d8d7e0;
}

.button:hover::before {
  border: 1px solid #1d1d1f;
}

.withValue .button {
  color: #B8B8C1;
}

.button.selected {
  color: #fff;
}

.button.selected::before {
  background-color: #1d1d1f;
  border: 1px solid #1d1d1f;
}

.labels {
  display: flex;
  justify-content: space-between;
  cursor: default;
  color: #b8b8c1;
  margin-top: 4px;
}
</style>
