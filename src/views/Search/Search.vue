<template>
    <div class="search">
        <header-top title="搜索"></header-top>
        <form class="search_form" @submit.prevent="search">
            <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword" />
            <input type="submit" class="search_submit" />
        </form>
        <section class="shops_list">
            <div class="shop_card" v-for="(shop,index) in searchShops" :key="index">
                <img :src="imgBaseUser + shop.image_path" alt="">
                <div class="shop_info">
                    <p class="name" v-text="shop.name"></p>
                    <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
                    <p>{{item.delivery_fee||item.float_minimum_order_amount}}元起送 / 距离{{shop.distance}}公里</p>
                </div>
            </div>
        </section>
        <section class="no_search" v-show="noSearchContent">很抱歉没有搜索结果</section>
    </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop";
import { mapState } from 'vuex';
export default {
    name: "Search",
    data () {
        return {
            keyword:'',
            imgBaseUser:'http://cangdu.org:8001/img/',//图片的基础路径
            noSearchContent:false
        }
    },
    computed:{
        ...mapState(['searchShops'])
    },
    methods:{
        search () {
            const keyword = this.keyword.trim()
            this.$store.dispatch('searchShops',keyword)
        },
    },
    components: {
        HeaderTop
    }
};
</script>

<style lang="less" scoped>
.search_form{
    margin: 10px 0;
    display: flex;
    justify-content: space-around;
    input{
        height: 35px;
        border: none;
        &:focus{
            outline: none;
        }
    }
    input[type="search"]{
        width: 78%;
        font-size: 14px;
        color: #757575;
        background-color: #F2F2F2;
    }
    input[type="submit"]{
        width: 15%;
        background-color: #02A774;
        padding: 0;
        color: #fff;
        font-weight: 700;
    }
}
.shops_list{
    .shop_card{
        padding: 10px 0;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #000;
        border-bottom: 1px solid #eee;
        img{
            width: 50px;
            height: 50px;
            display: block;
            margin: 0 10px;
        }
    }
}
</style>
