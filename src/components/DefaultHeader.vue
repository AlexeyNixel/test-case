<script>
import { defineComponent } from 'vue'
import { useFetch } from '@/composables/useFetch.js'

export default defineComponent({
  props: ['modelValue', 'cityId'],
  emits: ['update:modelValue'],

  data() {
    return {
      isOpen: false,
      city: undefined
    }
  },

  methods: {
    openModal() {
      this.$emit('update:modelValue', true)
    },
    async getCity() {
      this.city = await useFetch('/city/', { id: this.cityId })
    }
  },

  mounted() {
    this.getCity()
  },

  watch: {
    cityId() {
      this.getCity()
    }
  }
})
</script>

<template>
  <div>
    <header class="header">
      <div class="header__inner">
        <div
          @click="openModal"
          class="header__region"
          v-if="city?.data"
        >
          {{ city.data.city }}
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped>
.header {
  left: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 20px 0;
  box-shadow: 0 2px 4px 0 #2727271a;
}

.header__inner {
  margin: 0 auto;
  max-width: 1280px;
}

.header__region {
  cursor: pointer;
}

.header__region:hover {
  text-decoration: underline;
}
</style>
