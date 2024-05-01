<script>
import { defineComponent } from 'vue'
import { useFetch } from '@/composables/useFetch.js'

export default defineComponent({
  data() {
    return {
      searchText: '',
      selectCityId: '',
      cities: []
    }
  },

  props: ['modelValue', 'cityId'],
  emits: ['update:modelValue', 'update:cityId'],

  methods: {
    async getCities() {
      this.cities = await useFetch('/city/', {
        term: this.searchText,
        country: 'ru'
      })
    },

    closeModal() {
      this.$emit('update:modelValue', false)
    },

    selectRegion(region) {
      this.searchText = region.label
      this.selectCityId = region.id
    },

    confirmRegion() {
      this.$emit('update:modelValue', false)
      this.$emit('update:cityId', this.selectCityId)
      localStorage.setItem('city_id', this.selectCityId)
      this.$router.push('/')
    }
  },

  mounted() {
    this.getCities()
  },

  watch: {
    searchText() {
      if (this.searchText.length >= 3) {
        this.getCities()
      }
    }
  }
})
</script>

<template>
  <div class="substrate">
    <div class="modal">
      <div class="modal__header">
        <button
          class="modal-close"
          @click="closeModal"
        >
          <img
            src="@/public/x-mark.svg"
            alt=""
          />
        </button>
      </div>
      <div class="modal__body">
        <h3 class="modal-title">Выбор населённого пункта:</h3>
        <div class="modal-content">
          <div class="modal-select">
            <input
              type="text"
              class="modal-select__input"
              v-model="searchText"
            />
            <div
              class="modal-select__options"
              v-if="searchText.length >= 3"
            >
              <div
                class="options"
                v-for="item in cities.data"
                :key="item.id"
                @click="selectRegion(item)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
          <button
            @click="confirmRegion"
            class="modal-content__btn"
            :disabled="!selectCityId"
          >
            ПОДТВЕРДИТЬ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.substrate {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
}

.modal {
  background-color: #fff;
  margin: auto;
  width: 50%;
  padding: 20px;
  box-shadow: 0 2px 10px 0 #97979733;
  border-radius: 5px;
  height: 100px;
}

.modal__header {
  display: flex;
  justify-content: end;
  .modal-close {
    border: 0;
    background: transparent;
    cursor: pointer;
  }
}

.modal-content {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.modal-content__btn {
  padding: 15px;
  border-radius: 25px;
  border: 1px solid #9797974d;
  font-weight: bold;
  height: max-content;
  background: linear-gradient(270deg, #ffa800 0%, #ff6f00 60.2%);
  color: white;
  cursor: pointer;
}

.modal-content__btn:disabled {
  background: transparent;
  color: #272727;
}

.modal-select {
  width: 90%;
  background: white;
  border: 1px solid #97979780;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
}

.modal-select__input {
  width: 100%;
  background: white;
  border: 0;
  font-size: 18px;
}

.modal-select__input:focus {
  outline: none;
}

.modal-select__options {
  max-height: 200px;
  overflow-y: scroll;
  background: white;
  width: 100%;
}

.options {
  color: #979797;
  font-size: 18px;
}

.options:hover {
  color: #272727;
  cursor: pointer;
}
</style>
