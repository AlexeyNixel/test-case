<script>
import { useFetch } from '@/composables/useFetch.js'

export default {
  name: 'ProductCategory',
  props: ['cityId'],
  data() {
    return {
      categories: false
    }
  },
  methods: {
    async getCategories() {
      this.categories = await useFetch('/menutags', {
        city_id: this.cityId
      })
    }
  },
  watch: {
    cityId() {
      this.getCategories()
    }
  },
  mounted() {
    this.getCategories()
  }
}
</script>

<template>
  <div
    class="categories"
    v-if="categories"
  >
    <h2 class="categories__title">Категории товаров</h2>
    <div class="categories__body">
      <RouterLink
        class="categories-card"
        v-for="item in categories.tags"
        :key="item.id"
        :to="{ name: 'category', params: { slug: item.slug } }"
      >
        <div
          class="categories-card__text"
          :style="`color: ${item.text_color}`"
        >
          {{ item.name }}
        </div>
        <img
          class="categories-card__preview"
          :src="item.image"
          alt=""
        />
      </RouterLink>
    </div>
  </div>
  <div
    v-else
    class="no-content"
  >
    Загрузка
  </div>
</template>

<style scoped>
.no-content {
  max-width: 1280px;
  margin: auto;
}

.categories {
  max-width: 1280px;
  margin: auto;
}

.categories__title {
  margin: 20px 0;
}

.categories__body {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 30px;
}
.categories-card {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
}
.categories-card__text {
  position: absolute;
  font-size: 24px;
  font-weight: bold;
  text-wrap: normal;
  width: 90%;
  top: 15px;
  left: 15px;
}
.categories-card__preview {
  border-radius: 10px;
  width: 100%;
}

@media (max-width: 624px) {
  .categories__body {
    display: flex;
    margin: 0 10px;
    flex-direction: column;
    justify-items: center;
  }
}
</style>
