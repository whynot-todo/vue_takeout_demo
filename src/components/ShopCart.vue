<template>
    <div class="shop_cart">
        <section class="cart_left">
            <div class="cart_icon">
                <div class="iconfont_wrapper" :class="{highlight:totalCount}">
                    <i class="iconfont icon-shopping_cart"></i>
                </div>
                <div class="food_count" v-if="totalCount">{{totalCount}}</div>
            </div>
            <div class="price">
                <div class="price_number">￥{{totalPrice}}</div>
                <div class="price_dis">另需配送分￥{{shopInfo.deliveryPrice}}元</div>
            </div>
        </section>
        <section class="cart_right">
            <span class="money" :class="{highlight:payText==='结算'}">{{payText}}</span>
        </section>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
    computed: {
        ...mapState(["shopInfo"]),
        ...mapGetters(["totalCount", "totalPrice"]),
        payText() {
            const { totalPrice } = this;
            const { minPrice } = this.shopInfo;
            const number = minPrice - totalPrice;
            if (number === minPrice) {
                return `${minPrice}元起送`;
            } else if (number > 0) {
                return `还差${number}元起送`;
            } else {
                return "结算";
            }
        }
    }
};
</script>

<style lang='less' scoped>
.shop_cart {
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    color: white;
    background-color: #141d27;
    .cart_left {
        position: relative;
        flex: 1;
        .cart_icon {
            position: absolute;
            top: -10px;
            width: 50px;
            height: 50px;
            margin: 0 20px;
            border-radius: 50%;
            padding: 6px;
            background-color: #131c25;
            .iconfont_wrapper {
                position: relative;
                width: 95%;
                height: 95%;
                border-radius: 50%;
                text-align: center;
                line-height: 50px;
                &.highlight {
                    background-color: #02a774;
                }
                .icon-shopping_cart {
                    font-size: 25px;
                }
            }
            .food_count {
                width: 30px;
                height: 20px;
                border-radius: 10px;
                line-height: 20px;
                position: absolute;
                right: 0;
                top: 0;
                background-color: #f01414;
                font-size: 10px;
                font-weight: bold;
                text-align: center;
            }
        }
        .price {
            margin-left: 90px;
            .price_number {
                margin: 9px 0;
                font-weight: bold;
            }
            .price_dis {
                font-size: 10px;
                color: #656b72;
            }
        }
    }
    .cart_right {
        width: 30%;
        height: 50px;
        text-align: center;
        line-height: 20px;
        background-color: #2b333b;
        .money {
            display: block;
            line-height: 50px;
            font-weight: bold;
            font-size: 13px;
            color: #e9eaea;
            &.highlight{
                background-color: #00B43C;
            }
        }
    }
}
</style>