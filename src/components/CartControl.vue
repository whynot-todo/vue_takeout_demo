<template>
  <div class="cart-control">
    <transition name="remove">
            <span
              class="iconfont icon-remove_circle_outline"
              v-if="food.count"
              @click="updateCount(false)"
            ></span>
    </transition>

    <span class="control_count" v-if="food.count">{{food.count}}</span>
    <span class="iconfont icon-add_circle" @click="updateCount(true)"></span>
  </div>
</template>

<script>
  export default {
    props: {
      food: Object
    },
    methods: {
      updateCount (isAdd) {
        this.$store.dispatch('updateCount', {isAdd, food: this.food})
      }
    }
  }
</script>

<style lang='less' scoped>
.cart-control {
  font-size: 0;

  .icon-remove_circle_outline {
    font-size: 24px;
    color: #02a774;
  }

  .control_count {
    display: inline-block;
    vertical-align: top;
    line-height: 25px;
    font-size: 10px;
    padding: 0 4px;
  }

  .icon-add_circle {
    font-size: 24px;
    color: #02a774;
  }

  .remove-enter, .remove-leave-to {
    opacity: 0;
    transform: translateX(15px) rotate(180deg);
  }

  .remove-active-enter, remove-active-leave {
    transition: all .5s;
  }
}
</style>