<template>
    <header class="header">
        <div class="header_left">
            <slot name="left"></slot>
        </div>
        <div class="header_title">
            <span class="header_title_text">{{title}}</span>
        </div>
        <div class="header_right">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<script>
    export default {
        props:['title'],
        name: "HeaderTop"
    }
</script>

<style lang="less" scoped>
    .header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 45px;
        background-color: #02a774;
        z-index: 1000;
        .header_left {
            width: 20%;
            margin-left: 15px;
            font-size: 15px;
            color: white;
        }
        .header_title {
            width: 60%;
            font-size: 20px;
            color: #fff;
            .header_title_text {
                display: block;
                margin: 0 auto;
                width: 90%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
            }
        }
        .header_right {
            width: 20%;
            margin-right: 15px;
            font-size: 14px;
            color: #fff;
            text-align: right;
        }
    }
</style>
