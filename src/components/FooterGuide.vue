<template>
    <footer class="footer border-1px">
        <a @click.prevent="goPath('/msite')" href="javasript;" class="footer-item">
          <span :class="{on:isCurrent('/msite')}">
            <i class="iconfont icon-waimai"></i>
          </span>
            <span class="footer-span">外卖</span>
        </a>
        <a @click.prevent="goPath('/search')" href="javasript;" class="footer-item">
      <span :class="{on:isCurrent('/search')}">
        <i class="iconfont icon-search"></i>
      </span>
            <span class="footer-span">搜索</span>
        </a>
        <a @click.prevent="goPath('/order')" href="javasript;" class="footer-item">
      <span :class="{on:isCurrent('/order')}">
        <i class="iconfont icon-dingdan"></i>
      </span>
            <span class="footer-span">订单</span>
        </a>
        <a @click.prevent="goPath('/profile')" href="javasript;" class="footer-item">
      <span :class="{on:isCurrent('/profile')}">
        <i class="iconfont icon-geren"></i>
      </span>
            <span class="footer-span">我的</span>
        </a>
    </footer>
</template>

<script>
    export default {
        name: "FooterGuide",
        methods: {
            goPath(path) {
                console.log(this.$route.path)
                this.$router.replace(path)
            },
            isCurrent(path) {
                return this.$route.path === path
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/mixin";

    .footer {
        .top-border-1px(#e4e4e4);
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        width: 100%;
        background-color: #fff;
        z-index: 100;

        .footer-item {
            display: flex;
            flex: 1;
            flex-direction: column;
            align-items: center;
            text-align: center;
            font-size: 22px;
            margin: 5px;

            .iconfont {
                font-size: 22px;
            }
        }

        .on {
            color: #02a774;
        }

        .footer-span {
            display: block;
            font-size: 12px;
        }
    }
</style>
