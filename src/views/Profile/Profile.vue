<template>
    <div class="profile">
        <header-top title="我的"></header-top>
        <router-link to="/login">
            <section class="userinfo">
                <div class="avatar">
                    <i class="iconfont icon-person"></i>
                </div>
                <div class="userinfo_area">
                    <p class="username">123465</p>
                    <p class="user_phone">
                        <span class="phone_icon">
                            <i class="iconfont icon-shouji icon-mobile"></i>
                        </span>
                        <span>暂无绑定手机号</span>
                    </p>
                </div>
                <i class="iconfont icon-jiantou1"></i>
            </section>
        </router-link>

        <ul class="userinfo_number border-1px">
            <li class="balance border-1px">
                <div>
                    <span class="unit">0.00</span>
                    <span>元</span>
                </div>
                <p>我的余额</p>
            </li>
            <li class="discount">
                <div>
                    <span class="unit">0</span>
                    <span>个</span>
                </div>
                <p>我的优惠</p>
            </li>
            <li class="scorecard">
                <div>
                    <span class="unit">0</span>
                    <span>分</span>
                </div>
                <p>我的积分</p>
            </li>
        </ul>
        <section class="user_list">
            <a href="javascript:;" class="border-1px">
                <i class="iconfont icon-order-s"></i>
                <span>我的订单</span>
                <div class="arrow-right">
                    <i class="iconfont icon-jiantou1"></i>
                </div>
            </a>
            <a href="javascript:;" class="border-1px">
                <i class="iconfont icon-jifen"></i>
                <span>积分商城</span>
                <div class="arrow-right">
                    <i class="iconfont icon-jiantou1"></i>
                </div>
            </a>
            <a href="javascript:;" class="border-1px">
                <i class="iconfont icon-vip"></i>
                <span>外卖会员卡</span>
                <div class="arrow-right">
                    <i class="iconfont icon-jiantou1"></i>
                </div>
            </a>
            <a href="javascript:;" class="border-1px">
                <i class="iconfont icon-fuwu"></i>
                <span>服务中心</span>
                <div class="arrow-right">
                    <i class="iconfont icon-jiantou1"></i>
                </div>
            </a>
        </section>
        <section class="logout-btm">
            <van-button style="width:100%" type="danger">退出</van-button>
        </section>
    </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop";
/* 局部注册抓奸 */
export default {
    name: "Msite",
    components: {
        HeaderTop
    }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/mixin.less";
.profile {
    .userinfo {
        padding: 15px 20px;
        display: flex;
        align-items: center;
        background-color: #02a774;
        .avatar {
            border-radius: 50%;
            width: 60px;
            height: 60px;
            overflow: hidden;
            vertical-align: middle;
            .icon-person {
                font-size: 62px;
                color: #7e8c8d;
                background-color: #e4e4e4;
                border-radius: 50%;
            }
        }
        .userinfo_area {
            margin-left: 10px;
            flex: 1;
            .username {
                color: white;
                font-weight: bold;
                font-size: 18px;
            }
            .user_phone {
                color: white;
                font-size: 14px;
                .phone_icon {
                    // 字体图标过大影响位置，使用margin来调整位置
                    margin-left: -15px;
                    margin-right: -10px;
                }
                .iconfont {
                    font-size: 30px;
                    vertical-align: middle;
                }
            }
        }
        .icon-jiantou1 {
            color: white;
            font-size: 12px;
        }
    }
    .userinfo_number {
        .bottom-border-1px(#f1f1f1);
        display: flex;
        li {
            flex: 1;
            height: 85px;
            border-right: 1px #f1f1f1 solid;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .unit {
                font-size: 30px;
                font-weight: bold;
            }
            p {
                color: #666;
                font-size: 14px;
            }
        }
        .balance {
            color: #ffa319;
        }
        .discount {
            color: #ff5f3e;
        }
        .scorecard {
            color: #6ac20b;
        }
    }
    .user_list {
        margin-top: 30px;
        border-top: 1px solid #eee;
        a {
            display: flex;
            border-bottom: 1px solid #f1f1f1;
            font-size: 16px;
            padding: 10px 8px;
            align-items: center;
            .iconfont {
                font-size: 30px;
                font-weight: bold;
                vertical-align: middle;
            }
            .icon-order-s {
                color: #66c9ab;
            }
            .icon-jifen {
                color: #ff6241;
            }
            .icon-vip {
                color: #ffac30;
            }
            .icon-fuwu {
                color: #02a774;
            }
            span {
                flex: 1;
            }
            .arrow-right {
                vertical-align: middle;
                height: 100%;
                .icon-jiantou1 {
                    font-size: 10px;
                    line-height: 100%;
                }
            }
        }
    }
    .logout-btm {
        margin-top: 100px;
        padding: 0 20px;
    }
}
</style>
