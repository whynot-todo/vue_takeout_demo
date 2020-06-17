<template>
    <div>
        <shop-header></shop-header>
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
</style>