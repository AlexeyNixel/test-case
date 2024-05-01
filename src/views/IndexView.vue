<script>
import { useFetch } from '@/composables/useFetch.js'
import Categories from '@/components/Categories.vue'

export default {
  name: 'IndexView',
  components: { Categories },

  props: ['city_id'],

  data() {
    return {
      categories: undefined
    }
  },

  methods: {
    async getCategories() {
      this.categories = await useFetch('/menutags', {
        city_id: this.regionId
      })
    }
  },

  created() {
    this.getCategories()
  },

  watch: {
    regionId() {
      this.getCategories()
    }
  }
}
</script>

<template>
  <Categories />
</template>

<style scoped></style>
