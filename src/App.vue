<template>
    <div id="app">
        <router-view />
        <footer-guide v-show="$route.meta.showFooter"></footer-guide>
    </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide";
import { mapActions } from "vuex";
export default {
    created() {
        this.getUserInfo()
    },
    methods:{
        ...mapActions(['getUserInfo'])
    },
    components: {
        FooterGuide
    }
};
</script>
<style lang="less">
#app {
    width: 100%;
    height: 100%;
}

.clearfix {
    zoom: 1;
}

.clearfix:after {
    content: "";
    display: block;
    height: 0;
    font-size: 0;
    clear: both;
    overflow: hidden;
}
</style>
