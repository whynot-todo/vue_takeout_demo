<template>
    <div>
        <div class="fix">
            <header-top :title="address.name">
                <div slot="left">
                    <i class="iconfont icon-sousuo"></i>
                </div>
                <div slot="right">登录|注册</div>
            </header-top>
        </div>
        <nav class="border-1px">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                            <a href="javascript:;">
                                <img src="./nav/1.jpg" alt="">
                                <span>麻辣烫</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </nav>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import {mapState} from 'vuex'
    import 'swiper/css/swiper.min.css'
    import HeaderTop from "../../components/HeaderTop"

    export default {
        name: "Msite",
        computed: {
            ...mapState(["address"])
        },
        mounted() {
            /*触发方法*/
            this.$store.dispatch("getAddress");
            new Swiper('swiper-container',{
                loop:true,
                pagination:{
                    el:".swiper-pagination"
                }
            })
        },
        components: {
            HeaderTop
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/mixin";
    nav{
        .bottom-border-1px(#eee);
        height: 200px;
        div{
            display: flex;
            flex-wrap: wrap;
            a{
                display: block;
                width: 25%;
                font-size: 13px;
                color: #666;
                text-align: center;
                img{
                    display: block;
                    width: 50px;
                    height: 50px;
                    margin: 10px auto 8px;
                }
            }
        }


    }
</style>
