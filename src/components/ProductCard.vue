<script>
export default {
  name: 'ProductCart',
  props: ['product']
}
</script>

<template>
  <div class="product-card">
    <div class="product-card__preview">
      <img
        :src="product.main_image_thumb_300"
        alt=""
      />
    </div>
    <div class="product-card__body">
      <div class="product-card__item category">{{ product.category.name }}</div>
      <div class="product-card__item name">{{ product.present_name }}</div>
      <div class="product-card__item comment">{{ product.comment_name }}</div>
    </div>
    <div class="footer product-card__footer">
      <div class="footer__item price">{{ product.price }} ₽</div>
      <button
        class="footer__item footer__btn buy-btn"
        v-if="product.allowed && product.available"
      >
        В корзину
      </button>
      <button
        class="footer__item footer__btn buy-btn"
        v-else
        disabled
      >
        Нет в наличии
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  height: 100%;
  box-shadow: 0 2px 10px 0 #97979733;
  background-color: #ffffff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  .product-card__preview {
    img {
      width: 100%;
    }
  }
  .product-card__body {
    position: relative;
    text-align: center;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .product-card__item {
      margin: 5px 0;
    }

    .category {
      color: #979797;
    }

    .name {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .product-card__footer {
    margin-top: auto;
    text-align: center;
    margin-bottom: 20px;

    .footer__item {
      margin: 10px 0;
    }

    .price {
      font-size: 26px;
      font-weight: bold;
    }
    .buy-btn {
      font-size: 18px;
      font-weight: bold;
      color: white;
      width: 75%;
      padding: 10px;
      border: 0;
      border-radius: 20px;
      background: linear-gradient(270deg, #ffa800 0%, #ff6f00 100%);
      cursor: pointer;
    }
    .buy-btn:disabled {
      background: transparent;
      color: #27272780;
      outline: 2px solid #27272780;
      font-weight: bold;
    }
  }
}
</style>
