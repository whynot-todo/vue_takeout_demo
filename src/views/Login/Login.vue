<template>
    <div class="login">
        <div class="login_header">
            <i @click="$router.back()" class="iconfont icon-jiantou2"></i>
        </div>
        <h2>外卖平台</h2>
        <div class="login_way">
            <span @click="TogloginWay(true)" :class="{on:loginWay===true}">短信登录</span>
            <span @click="TogloginWay(false)" :class="{on:loginWay===false}">密码登录</span>
        </div>
        <section :class="{on:loginWay===false}" class="login_area_phone">
            <div class="login_input">
                <section class="section_input">
                    <input v-model="phone" type="text" placeholder="手机号" />
                    <button
                        :disabled="!rightPhone"
                        :class="{right_phone:rightPhone}"
                        @click="getCode"
                        class="switch_btn sms_btn"
                    >{{computedTime>0?`已发送 ${computedTime} s`:'获取验证码'}}</button>
                </section>
                <section class="section_input">
                    <input v-model="code" type="text" placeholder="验证码" />
                </section>
            </div>
            <div class="login_hint">
                <p>
                    温馨提示：未注册外卖帐号的手机号，登录时将自动注册，且代表已同意
                    <span>《用户服务协议》</span>
                </p>
            </div>
        </section>
        <section :class="{on:loginWay===true}" class="login_area_password">
            <div class="login_input">
                <section class="section_input">
                    <input type="text" v-model="username" placeholder="手机/邮箱/用户名" />
                </section>
                <section class="section_input">
                    <!-- 使用两个输入框来解决显示密码的问题 -->
                    <input type="password" v-model="password" placeholder="密码" v-if="showPwd" />
                    <input type="text" v-model="password" placeholder="密码" v-else />
                    <!-- 切换按钮 -->
                    <div
                        class="switch_btn"
                        :class="{on:showPwd===false}"
                        @click="showPwd = !showPwd"
                    >
                        <!-- 切换的圆形按钮 -->
                        <div class="switch_circle" :class="{on:showPwd===false}"></div>
                        <!-- 按钮的背景色 -->
                        <span>{{showPwd?'...':'abc'}}</span>
                    </div>
                </section>
                <section class="section_input">
                    <input v-model="captcha" class="last_input" type="text" placeholder="验证码" />
                    <img ref="captcha" src="http://localhost:3000/captcha" @click="getCaptcha" alt />
                </section>
            </div>
        </section>
        <section class="login_btn">
            <button @click="login">登录</button>
            <p>关于我们</p>
        </section>
    </div>
</template>

<script>
import { reqPwdLogin, reqSendCode, reqSmsLogin } from "../../api/index.js";
import { Toast } from "vant";
export default {
    data() {
        return {
            showPwd: true,
            loginWay: true, // ture代表手机登录，false代表密码登录
            username: "",
            password: "",
            captcha: "",
            computedTime: 0, //发送验证码的计时
            phone: "", //手机号
            code: "" //短信验证码
        };
    },
    computed: {
        rightPhone() {
            console.log(this.phone);
            /* 检验手机号是否符合规范 */
            return /^1\d{10}$/.test(this.phone);
        }
    },
    methods: {
        async getCode() {
            /* 如果没有计时 */
            if (!this.computedTime) {
                /* 启动倒计时 */
                this.computedTime = 30;
                this.intervalId = setInterval(() => {
                    this.computedTime--;
                    /* 倒计时为0的时候 */
                    if (this.computedTime < 0) {
                        clearInterval(this.intervalId);
                    }
                }, 1000);
            }
            const result = await reqSendCode(this.phone);
            if (result.code === 1) {
                Toast.fail("短信验证码发送失败");
                /* 停止计时 */
                if (this.computedTime) {
                    this.computedTime = 0;
                    clearInterval(this.intervalId);
                    /* 保险起见 */
                    this.intervalId = null;
                }
            }
        },
        TogloginWay(flag) {
            this.loginWay = flag;
        },
        async login() {
            let result;
            if (this.loginWay) {
                /* 手机登录 */
                const { phone, code, rightPhone } = this;
                /* 表单验证 */
                if (!rightPhone) {
                    Toast("手机号不正确");
                    return;
                } else if (!/^\d{6}$/.test(code)) {
                    Toast("验证必须是6位数字");
                    return;
                }
                result = await reqSmsLogin(phone, code);
            } else {
                const { username, password, captcha } = this;
                const result = await reqPwdLogin({
                    username,
                    password,
                    captcha
                });
            }
            // 停止计时
            if (this.computeTime) {
                this.computeTime = 0;
                clearInterval(this.intervalId);
                this.intervalId = undefined;
            }
            if (result.code === 0) {
                const user = result.data;
                /* 同步保存到vux中 */
                this.$store.dispatch("recordUser", user);
                this.$router.replace("/profile");
            }
        },
        getCaptcha() {
            this.$refs.captcha.src =
                "http://localhost:3000/captcha?time" + Date.now();
        }
    }
};
</script>

<style lang='less' scoped>
.login {
    .login_header {
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        color: #b8b8b8;
    }
    h2 {
        margin-top: 50px;
        text-align: center;
        font-size: 40px;
        color: #02a774;
    }
    .login_way {
        text-align: center;
        margin-top: 40px;
        margin-bottom: 20px;
        span {
            font-size: 14px;
            color: #333;
            border-bottom: 2px solid transparent;
            padding-bottom: 4px;
            &:nth-child(1) {
                margin-right: 40px;
            }
            &.on {
                color: #0eaa7a;
                font-weight: bold;
                border-bottom: 2px solid #0eaa7a;
            }
        }
    }
    .login_area_phone,
    .login_area_password,
    .login_btn {
        padding: 0 45px;
        &.on {
            display: none;
        }
    }
    // 格式化input，在reset.css
    .login_hint {
        font-size: 14px;
        color: #999;
        span {
            color: #02a774;
        }
    }
    .section_input {
        position: relative;
        margin-bottom: 15px;
        .right_phone {
            color: #000 !important;
        }
        /* 切换按钮处理 */
        .switch_btn {
            width: 30px;
            height: 16px;
            // 移动位置
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 12px;
            line-height: 16px;
            // 边框处理
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 0 8px;
            &.on {
                background-color: #02a774;
                span {
                    float: left;
                    color: #ddd;
                }
                .switch_circle {
                    // 通过计算来决定移动多少  width + padding -childWidth
                    transform: translateX(30px);
                }
            }
            // 圆形按钮处理
            .switch_circle {
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                /* 可以使用定位来调位置，也可以使用怪异盒模型 */
                position: absolute;
                // 因为放了一个一像素的边框
                top: -1px;
                left: -1px;
                // 动画
                transition: transform 0.3s;
                background-color: #fff;
            }
            span {
                float: right;
            }
        }
        .sms_btn {
            background-color: transparent;
            width: auto;
            height: auto;
            font-size: 16px;
            white-space: nowrap;
            color: #ccc;
            border: none;
            padding: 4px 4px;
            &:focus {
                border: 1px solid #02a774;
                outline: 1px #02a774;
            }
        }
        /* 调整验证码位置 */
        img {
            display: block;
            width: 100px;
            height: 40px;
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .login_btn {
        margin-top: 40px;
        button {
            width: 100%;
            height: 40px;
            outline: none;
            background-color: #4cd96f;
            border: none;
            border-radius: 4px;
            color: #fff;
        }
        p {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #999;
        }
    }
}
</style>