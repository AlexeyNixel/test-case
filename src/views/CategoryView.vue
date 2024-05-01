<script>
import { useFetch } from '@/composables/useFetch.js'
import ProductCard from '@/components/ProductCard.vue'

export default {
  name: 'CategoryView',
  components: { ProductCard },
  props: ['cityId'],
  data() {
    return {
      categories: [],
      products: [],
      slug: this.$route.params.slug,
      subcategorySlug:
        this.$route.params.subcategorySlug || this.$route.params.slug
    }
  },
  methods: {
    handleNavigate(slug = '') {
      this.subcategorySlug = slug
      this.$router.push({
        name: 'category',
        params: {
          slug: this.slug,
          subcategorySlug: slug
        }
      })
    }
  },
  computed: {
    category() {
      if (this.categories?.tags) {
        return this.categories.tags.find((item) => item.slug === this.slug)
      } else {
        return []
      }
    },

    sortedProducts() {
      if (this.products.products) {
        if (this.subcategorySlug) {
          return this.products.products.filter((item) => {
            return item.tags.find((tag) => tag.slug === this.subcategorySlug)
          })
        } else {
          return this.products.products
        }
      } else {
        return []
      }
    }
  },

  async mounted() {
    this.categories = await useFetch(`/menutags/`, {
      city_id: this.cityId
    })
    this.products = await useFetch(`/menutags/${this.slug}`, {
      city_id: this.cityId
    })
  }
}
</script>

<template>
  <div
    class="category-product"
    v-if="sortedProducts.length > 0"
  >
    <div class="category-product__header">
      <router-link
        class="prev-link"
        to="/"
      >
        <img
          class="prev-link__img"
          src="@/public/leftArrow.svg"
          alt=""
        />
      </router-link>
      <h2 class="title">{{ category.name }}</h2>
    </div>
    <div class="category-product__body">
      <div class="aside">
        <button
          @click="handleNavigate()"
          class="aside__item"
          :class="!this.subcategorySlug ? 'aside__item_active' : ''"
        >
          Все продукты
        </button>
        <button
          @click="handleNavigate(item.slug)"
          v-for="item in category.children"
          :key="item.id"
          class="aside__item"
          :class="
            item.slug === this.subcategorySlug ? 'aside__item_active' : ''
          "
        >
          {{ item.name }}
        </button>
      </div>
      <div class="main">
        <div
          class="main__item"
          v-for="item in sortedProducts"
          :key="item.id"
        >
          <product-card :product="item" />
        </div>
      </div>
    </div>
  </div>
  <div
    class="no-content"
    v-else
  >
    Загрузка...
  </div>
</template>

<style scoped>
.category-product {
  .category-product__header {
    display: flex;
    align-items: center;

    .prev-link {
      display: flex;
    }

    .title {
      margin-left: 10px;
    }
  }
  .category-product__body {
    margin-top: 10px;
    display: flex;

    .aside {
      width: 20%;

      .aside__item {
        display: flex;
        width: 100%;
        padding: 10px;
        font-size: 16px;
        background: transparent;
        border: 0;
        border-bottom: 1px solid #e9eef3;
        color: black;
        text-decoration: none;
        cursor: pointer;
      }
      .aside__item_active {
        background-color: #e9eef3;
      }
    }

    .main {
      display: grid;
      width: 80%;
      gap: 10px;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      margin-left: 20px;
    }
  }
}

.no-content {
  text-align: center;
  height: 100%;
  font-size: 24px;
  font-weight: bold;
}
</style>
