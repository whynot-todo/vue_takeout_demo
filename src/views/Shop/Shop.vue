<template>
    <div>
        <shop-header></shop-header>
        <div class="tab">
            <div class="tab_item">
                <router-link to="/shop/goods" replace>点餐</router-link>
            </div>
            <div class="tab_item">
                <router-link to="/shop/ratings" replace>评价</router-link>
            </div>
            <div class="tab_item">
                <router-link to="/shop/info" replace>商家</router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import ShopHeader from "@/components/ShopHeader";
export default {
    data() {
        return {};
    },
    mounted() {
        this.$store.dispatch("getShopInfo");
    },
    components: {
        ShopHeader
    }
};
</script>

<style lang='less' scoped>
@import '../../assets/less/mixin.less';
.tab {
    .bottom-border-1px(rgba(7, 17, 27, 0.1));
    display: flex;
    justify-content: center;
    align-items: center;
    .tab_item {
        flex: 1;
        text-align: center;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        color: rgb(77, 85, 93);
        a {
            display: block;
            height: 100%;
            &.router-link-active {
                position: relative;
                color: #02a774;
                &::after {
                    content: "";
                    position: absolute;
                    left: 50%;
                    bottom: 0px;
                    transform: translateX(-50%);
                    width: 35px;
                    height: 2px;
                    background: #02a774;
                }
            }
        }
    }
}
</style>