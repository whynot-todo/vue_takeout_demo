<template>
    <div>
        <div v-if="shops.length">
            <section class="shop" v-for="(shop,index) in shops" :key="index" @click="toShop">
                <section class="shop-left">
                    <img src alt />
                </section>
                <section class="shop-middle">
                    <div>
                        <span class="shop-rank">品牌</span>
                        <span class="shop-name">{{shop.name}}</span>
                    </div>
                    <div class="shop-middle-middle">
                        <Star :rating="shop.rating" :size="24" />
                        <span class="scroe">{{shop.rating}}</span>
                        <span class="sale">月售{{shop.recent_order_num}}单</span>
                    </div>
                    <div class="shop-middle-bottom">
                        <span>￥20起送 / 配送费￥{{shop.float_delivery_fee}}</span>
                    </div>
                </section>
                <section class="shop-right">
                    <div class="shop-right-top">
                        <span>保</span>
                        <span>票</span>
                        <span>准</span>
                    </div>
                    <span class="green-center">个人专送</span>
                </section>
            </section>
        </div>

        <ul v-else>
            <li v-for="(item,index) in 6" :key="index">
                <img src="./images/shop_back.svg" alt />
            </li>
        </ul>
    </div>
</template>

<script>
import Star from '@/components/Star'
import { mapState } from "vuex";
export default {
	methods:{
		toShop () {
			this.$router.push('./shop')
		}
	},
	computed: {
		...mapState(["shops"])
	},
	components: {
		Star
	}
};
</script>

<style lang='less' scoped>
@import '../assets/less/mixin.less';
.shop {
	display: flex;
	padding: 15px 8px;
	.shop-left {
		width: 70px;
		height: 70px;
		border: 1px solid black;
	}
	.shop-middle {
		flex: 1;
		padding-left: 8px;
		.shop-rank {
			padding: 1px 2px;
			font-size: 11px;
			font-weight: bold;
			background-color: #ffd930;
		}
		.shop-name {
			font-size: 16px;
			font-weight: bold;
		}
		.shop-middle-middle {
			display: flex;
			margin: 15px 0;
			span {
				font-size: 10px;
				color: #666;
			}
			.scroe {
				color: #ff8c47;
				font-weight: bold;
				margin: 0 2px;
			}
			.sale {
				transform: scale(0.7);
			}
		}
		.shop-middle-bottom {
			font-size: 12px;
			color: #666;
		}
	}
	.shop-right {
		text-align: center;

		.shop-right-top {
			font-size: 0;
			margin-bottom: 15px;
			span {
				font-size: 10px;
				color: #9b9b9b;
				border: 1px solid #8cb1d4;
				padding: 0 1px;
			}
		}

		.green-center {
			display: inline-block;
			color: #16ad7f;
			border: 1px solid #16ad7f;
			font-size: 12px;
			font-weight: bold;
			transform: scale(0.9);
		}
	}
}
</style>