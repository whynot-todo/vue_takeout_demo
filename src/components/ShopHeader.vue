<template>
    <div class="shop-header">
        <section>
            <section
                class="header-nav"
                @click="$router.back()"
                :style="{backgroundImage: `url(${shopInfo.bgImg})`}"
            >
                <i class="iconfont icon-arrow_left"></i>
            </section>
            <section class="header-content">
                <img class="shop-logo" :src="shopInfo.avatar" alt @click="showShopInfo" />
                <div class="shop-title" @click="showShopInfo">
                    <span class="min-tag">品牌</span>
                    <div class="shop-name">{{shopInfo.name}}</div>
                    <i class="content-icon"></i>
                </div>
                <div class="shop-rating">
                    <span>{{shopInfo.score}}</span>&nbsp;&nbsp;
                    <span>月售{{shopInfo.sellCount}}单</span>&nbsp;&nbsp;
                    <span>约{{shopInfo.deliveryTime}}分钟</span>
                    <span>{{shopInfo.description}}</span>&nbsp; &nbsp;
                    <span>距离{{shopInfo.distance}}</span>
                </div>
                <div class="shop-info" @click="showShopActi">
                    <span class="min-tag">首单</span>
                    <span class="activities">新用户下单立减17元(不与其他活动同时参与)</span>&nbsp;&nbsp;
                    <span>
                        8个优惠
                        <i></i>
                    </span>
                </div>
            </section>
        </section>
        <transition name="fade">
            <section class="notice-hint" v-show="showHint">
                <div class="notice-content">
                    <h2>
                        <span class="mini_tag">品牌</span>
                        <span class="notice_title">{{shopInfo.name}}</span>
                    </h2>
                    <ul>
                        <li>
                            <h3>{{shopInfo.score}}</h3>
                            <p>评分</p>
                        </li>
                        <li>
                            <h3>{{shopInfo.sellCount}}单</h3>
                            <p>月售</p>
                        </li>
                        <li>
                            <h3>{{shopInfo.description}}</h3>
                            <p>约{{shopInfo.deliveryTime}}分钟</p>
                        </li>
                        <li>
                            <h3>{{shopInfo.deliveryPrice}}元</h3>
                            <p>配送费用</p>
                        </li>
                        <li>
                            <h3>{{shopInfo.distance}}</h3>
                            <p>距离</p>
                        </li>
                    </ul>
                    <div class="notice">
                        <span>公告</span>
                    </div>
                    <div class="notice_footer">
                        <span>{{shopInfo.bulletin}}</span>
                    </div>
                </div>
                <div class="icon_close" @click="showShopInfo">
                    <i class="iconfont icon-close"></i>
                </div>
            </section>
        </transition>
        <transition name="fade">
            <section class="activity" v-show="showAcitivity">
                <div class="active_content">
                    <div class="active_title">优惠活动</div>
                    <ul>
                        <li v-for="(support,index) in shopInfo.supports">
                            <span class="mini_tag">{{support.name}}</span>
                            <span class="activity_content">{{support.content}}</span>
                        </li>
                    </ul>
                    <div class="icon_close2" @click="showShopActi">
                        <i class="iconfont icon-close"></i>
                    </div>
                </div>
            </section>
        </transition>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            showHint: false,
            showAcitivity: false
        };
    },
    computed: {
        ...mapState(["shopInfo"])
    },
    methods: {
        showShopInfo() {
            this.showHint = !this.showHint;
        },
        showShopActi() {
            this.showAcitivity = !this.showAcitivity;
        }
    }
};
</script>

<style lang='less' scoped>
.shop-header {
    .header-nav {
        height: 50px;
        /* 题上面用的是over属性 */
        background-size: 100% 100%;

        .iconfont {
            font-size: 20px;
            line-height: 50px;
            margin-left: 10px;
        }
    }

    .header-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        border: 1px transparent solid;

        img {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -33px;
            display: block;
            width: 66px;
            height: 66px;
            background-color: royalblue;
            z-index: 20;
        }

        .shop-title {
            margin-top: 50px;
            display: flex;

            .min-tag {
                background-color: #ffe631;
                font-size: 24px;
                display: inline-block;
                padding: 5px 8px;
                transform-origin: 38px 15px;
                transform: scale(0.5);
            }

            .shop-name {
                position: relative;
                font-size: 22px;
                font-weight: bold;
                /* 为什么文字不居中，他不是撑开的吗？ */
                line-height: 34px;
            }

            .content-icon {
                position: relative;
                width: 20px;
                height: 16px;

                &::before {
                    position: absolute;
                    content: "";
                    left: 6px;
                    top: 10px;
                    border-left: 6px solid gray;
                    border-top: 6px solid transparent;
                    border-bottom: 6px solid transparent;
                    border-right: 6px solid transparent;
                }
            }
        }

        .shop-rating {
            margin-top: 3px;
            font-size: 11px;
        }

        .shop-info {
            margin-top: 8px;
            white-space: nowrap;
            font-size: 11px;

            .min-tag {
                display: inline-block;
                padding: 4px 5px;
                font-size: 18px;
                background-color: #70bc46;
                color: #fff;
                transform-origin: 40px 20px;
                transform: scale(0.5);
            }

            .activities {
                display: inline-block;
                width: 180px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.notice-hint {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(100, 100, 100, 0.8);
    z-index: 100;

    .notice-content {
        width: 90%;
        background-color: #fff;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;

        h2 {
            .mini_tag {
                display: inline-block;
                background-color: yellow;
                font-size: 24px;
                padding: 5px 8px;
                transform: scale(0.5);
                transform-origin: 40px;
            }

            .notice_title {
                font-size: 20px;
                font-weight: 700;
            }
        }

        ul {
            display: flex;
            width: 100%;
            margin-top: 10px;

            li {
                flex: 1;

                h3 {
                    font-size: 15px;
                    font-weight: 700;
                    text-align: center;
                }

                p {
                    font-size: 12px;
                    margin-top: 5px;
                    text-align: center;
                    color: #acacac;
                }
            }
        }

        .notice {
            width: 50%;
            margin: 10px;
            background-image: linear-gradient(90deg, #fff, #333 50%, #fff);
            background-size: 100% 1px;
            background-repeat: no-repeat;
            text-align: center;
            background-position: 50%;

            span {
                background-color: #fff;
                padding: 0 10px;
                font-size: 12px;
                color: #d7d7d7;
            }
        }

        .notice_footer {
            width: 90%;
            font-size: 12px;
            color: #333;
            line-height: 1.5;
            overflow-y: auto;
            word-break: break-all;
            height: 60px;
        }
    }
}

.icon_close {
    margin-top: 20px;
    width: 25px;
    height: 25px;
    font-size: 20px;
    color: rgba(2255, 225, 225, 0.8);
    border: 1px solid rgba(2255, 225, 225, 0.8);
    text-align: center;
    line-height: 22px;
    border-radius: 50%;
}

.activity {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(100, 100, 100, 0.8);
    z-index: 100;

    .active_content {
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        height: 250px;
        background-color: #f5f5f5;
        z-index: 10000;

        .active_title {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin: 15px 0;
        }

        ul {
            width: 80%;
            height: 100%;
            margin: 0 auto;
            overflow-y: auto;

            li {
                margin: 20px 0;

                .mini_tag {
                    display: inline-block;
                    background-color: green;
                    color: #fff;
                    transform: scale(0.8);
                    padding: 5px 8px 3px;
                }

                .activity_content {
                    width: 80%;
                    font-size: 13px;
                    display: inline-block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

        .icon_close2 {
            position: absolute;
            right: 10px;
            top: 10px;

            .iconfont {
                font-size: 20px;
            }
        }
    }
}
</style>