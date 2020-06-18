<template>
    <div class="goods">
    <section class="menu_wrapper">
        <ul class="menu_list">
            <li
                class="menu_item on"
                v-for="(food,index) in foods"
                @click="clickItem(index)"
                :key="index"
                :class="{current:index === currentIndex}"
            >
                <span>
                    <img class="icon" :src="food.icon" v-if="food.icon" />
                    {{food.name}}
                </span>
            </li>
        </ul>
    </section>
    <section class="goods_wrapper">
        <ul ref="foodsUl">
            <li class="good_item" v-for="(food,index) in foods" :key="index">
                <h1>{{food.name}}</h1>
                <ul>
                    <li class="food_card" v-for="(fooditem,index) in food.foods">
                        <img class="food_icon" :src="fooditem.icon" />
                        <div class="card_right">
                            <h2 class="food_name">{{fooditem.name}}</h2>
                            <p
                                class="food_rating"
                            >月售{{fooditem.sellCount}}}份&nbsp;&nbsp;&nbsp;&nbsp; 好评率 {{fooditem.rating}}}%</p>
                            <div>
                                <span class="discount">￥{{fooditem.price}}</span>
                                <span
                                    class="prici"
                                    v-if="fooditem.oldPrice"
                                >￥{{fooditem.oldPrice}}</span>
                            </div>
                            <div class="card_control">
                                <cart-control :food="fooditem"></cart-control>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
    <ShopCart />
</div>

</template>

<script>
import {mapState} from 'vuex'
import BScroll from "@better-scroll/core";
import CartControl from '@/components/CartControl'
import ShopCart from '@/components/ShopCart'
export default {
    data() {
        return {
            scrollY: 0,
            tops: []
        };
    },
    mounted() {
        this.$store.dispatch("getShopFoods", () => {
            this.$nextTick(() => {
                this._initScroll();
                this._initTops();
            });
        });
    },
    methods: {
    // 绑定监听，获取实时位置
        _initScroll() {
            new BScroll(".menu_wrapper", {
                click: true
            });
            this.foodsScroll = new BScroll(".goods_wrapper", {
                click: true,
                probeType: 2
            });
            this.foodsScroll.on("scroll", ({ x, y }) => {
                this.scrollY = Math.abs(y);
            });
            this.foodsScroll.on("scrollEnd", ({ x, y }) => {
                this.scrollY = Math.abs(y);
            });
        },
        // 获取滑动区域高度
        _initTops() {
            const tops = [];
            let top = 0;
            tops.push(top);
            const lis = this.$refs.foodsUl.getElementsByClassName("good_item");
            Array.prototype.slice.call(lis).forEach((li, index) => {
                top += li.clientHeight;
                tops.push(top);
            });
            this.tops = tops;
        },
        // 点击滑动
        clickItem(index) {
            const scrollY = this.tops[index];
            this.scrollY = scrollY;
            this.foodsScroll.scrollTo(0, -scrollY, 300);
        }
    },
    computed: {
        ...mapState(["foods"]),
        // 动态计算
        currentIndex() {
            const { tops, scrollY } = this;
            const index = tops.findIndex((top, index) => {
                return (scrollY >= top) & (scrollY < tops[index + 1]);
            });
            return index;
        }
    },
    components: {
        CartControl,
        ShopCart
    }
};

</script>

<style lang='less' scoped>
@import '../../../assets/less/mixin.less';

.goods {
    width: 100%;
    display: flex;
    position: absolute;
    top: 225px;

    bottom: 46px;
    overflow: hidden;

    .menu_wrapper {
        width: 80px;
        height: 100%;
        background-color: #f3f5f7;

        .menu_item {
            height: 54px;
            text-align: center;
            line-height: 54px;
            font-size: 12px;

            &.current {
                background-color: #fff;
                color: green;
                margin-top: -1px;
            }

            .icon {
                width: 12px;
                height: 12px;
            }
        }
    }

    .goods_wrapper {
        flex: 1;

        .good_item {
            h1 {
                font-size: 12px;
                color: #9ba0a6;
                background-color: #f3f5f7;
                border-left: 3px #d9dde1 solid;
                padding: 5px 0;
            }

            ul {
                .food_card {
                    position: relative;
                    display: flex;
                    padding: 20px 15px;
                    .bottom-border-1px(#f9fafa);

                    .food_icon {
                        display: block;
                        width: 66px;
                        height: 66px;
                        background-color: cadetblue;
                    }

                    .card_right {
                        margin-left: 10px;

                        .food_name {
                            font-size: 14px;
                        }

                        .food_rating {
                            font-size: 10px;
                            color: #c2c5c9;
                            margin: 10px 0;
                        }

                        .discount {
                            font-size: 14px;
                            color: red;
                        }

                        .prici {
                            font-size: 10px;
                            text-decoration: line-through;
                            color: #d8dadc;
                        }

                        .card_control {
                            position: absolute;
                            right: 20px;
                            bottom: 25px;
                        }
                    }
                }
            }
        }
    }
}


</style>