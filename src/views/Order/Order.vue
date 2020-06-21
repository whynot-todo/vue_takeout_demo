<template>
    <div class="order">
        <header-top title="订单列表"></header-top>
        <div class="order_content">
            <img src="./images/person.png" alt />
            <p class="order_hint">登录后查看外卖订单</p>
            <button class="order_login">立即登录</button>
        </div>
    </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop";
export default {
    name: "Order",
    components: {
        HeaderTop
    }
};
</script>

<style lang="less" scoped>
.order {
    .order_content {
        margin-top: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            width: 60%;
        }
        .order_hint{
            margin-top: 10px;
            font-size: 17px;
            color: #6a6a6a;
        }
        .order_login{
            margin-top: 10px;
            background-color: #02a774;
            border: none;
            outline: none;
            color: #fff;
            padding: 10px 15px;
            border-radius: 5px;
        }
    }
}
</style>
