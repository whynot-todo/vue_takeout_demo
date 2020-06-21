<template>
    <div>
        <header-top :title="address.name">
            <div slot="left">
                <i class="iconfont icon-sousuo"></i>
            </div>
            <div slot="right">
                <router-link :to="userInfo._id?'/userinfo':'/login'">
                    <span v-if="!userInfo._id" class="login">登录|注册</span>
                    <span v-else><i class="iconfont icon-person"></i></span>
                </router-link>
            </div>
        </header-top>
        <div class="wrapper">
            <div>
                <nav class="border-1px">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div
                                class="swiper-slide"
                                v-for="(categorys, index) in categorysArr"
                                :key="index"
                            >
                                <a
                                    href="javascript:;"
                                    v-for="(category, index) in categorys"
                                    :key="index"
                                >
                                    <img :src="baseImageUrl + category.image_url" alt />
                                    <span v-text="category.title"></span>
                                </a>
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </nav>
                <section class="shopper border-1px">
                    <i class="iconfont icon-xuanxiang"></i>
                    <span>附近商家</span>
                </section>
                <ShopList />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import "swiper/css/swiper.min.css";
import Swiper from "swiper";
import BScroll from "@better-scroll/core";

import HeaderTop from "../../components/HeaderTop";
import ShopList from "@/components/ShopList";

export default {
    name: "Msite",
    data() {
        return {
            baseImageUrl: "https://fuss10.elemecdn.com"
        };
    },
    computed: {
        ...mapState(["address", "categorys","userInfo"]),
        categorysArr() {
            const { categorys } = this;
            // 准备空的2维数组
            const arr = [];
            // 准备一个小数组(最大长度为8)
            let lastArr = [];
            // 遍历categorys
            categorys.forEach(c => {
                // 如果当前小数组已经满了, 创建一个新的
                if (lastArr.length === 8) {
                    lastArr = [];
                }
                // 如果minArr是空的, 将小数组保存到大数组中
                if (lastArr.length === 0) {
                    arr.push(lastArr);
                }
                // 将当前分类保存到小数组中
                lastArr.push(c);
            });
            return arr;
        }
    },
    mounted() {
        /*触发方法*/
        this.$store.dispatch("getAddress");
        this.$store.dispatch("getCategorys");
        this.$store.dispatch("getShops");
    },
    watch: {
        categorys(value) {
            this.$nextTick(() => {
                new Swiper(".swiper-container", {
                    loop: true,
                    pagination: {
                        el: ".swiper-pagination"
                    }
                });
                new BScroll(".wrapper", {
                    click: true
                });
            });
        }
    },
    components: {
        HeaderTop,
        ShopList
    }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/mixin";
.login{
    color: #fff;
}
.icon-person{
    color: #fff;
    font-size: 20px !important;
}
.wrapper {
    position: fixed;
    width: 100%;
    top: 45px;
    bottom: 46px;
    overflow: hidden;
}
.swiper-container {
    height: 100%;
    --swiper-pagination-color: #02a774;
    .swiper-wrapper {
        height: 100%;
        .swiper-slide {
            height: 100%;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            align-items: flex-start;
        }
    }
}

nav {
    .bottom-border-1px(#eee);
    height: 200px;
    a {
        display: block;
        width: 25%;
        font-size: 13px;
        color: #666;
        text-align: center;
        img {
            display: block;
            width: 50px;
            height: 50px;
            margin: 10px auto 0;
        }
    }
}
.iconfont {
    font-size: 25px;
}
.shopper {
    .top-border-1px(#e4e4e4);
    margin-top: 10px;
    padding-top: 10px;
    padding-left: 10px;
    background-color: #fff;
    font-size: 14px;
    color: #999;
    .iconfont {
        color: #464646;
        font-size: 14px;
    }
}
</style>
