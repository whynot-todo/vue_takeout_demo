<template>
    <section class="star" :class="'star-' + size">
        <span class="star-item" v-for="(star,index) in starsArr" :class="star" :key="index"></span>
    </section>
</template>

<script>
const CLASS_ON = "on";
const CLASS_HALF = "half";
const CLASS_OFF = "off";
export default {
    props: ["rating", "size"],
    computed: {
        starsArr() {
            const { rating } = this;
            const arr = [];
            const ratingInteget = Math.floor(rating);
            for (let i = 0; i < ratingInteget; i++) {
                arr.push(CLASS_ON);
            }
            if (rating * 10 - ratingInteget * 10 >= 5) {
                arr.push(CLASS_HALF);
            }
            while (arr.length < 5) {
                arr.push(CLASS_OFF);
            }
            return arr;
        }
    }
};
</script>

<style lang='less' scoped>
@import '../assets/less/mixin.less';
.star {
	font-size: 0;
	.star-item {
		display: inline-block;
		background-repeat: no-repeat;
	}
	&.star-48 {
		.star-item {
			width: 20px;
			height: 20px;
			margin-right: 22px;
			background-size: 20px 20px;
			&:last-child {
				margin-right: 0;
			}
			&.on {
				.bg-image("../../components/images/star48_on");
			}
			&.off {
				.bg-image("../../components/images/star48_on");
			}
			&.half {
				.bg-image("../../components/images/star48_half");
			}
		}
	}
	&.star-36 {
		.star-item {
			width: 15px;
			height: 15px;
			margin-right: 6px;
			background-size: 15px 15px;
			&:last-child {
				margin-right: 0;
			}
			&.on {
				.bg-image("../../components/images/star36_on");
			}
			&.off {
				.bg-image("../../components/images/star36_off");
			}
			&.half {
				.bg-image("../../components/images/star36_half");
			}
		}
	}
	&.star-24 {
		.star-item {
			width: 10px;
			height: 10px;
			margin-right: 3px;
			background-size: 10px 10px;
			&:last-child {
				margin-right: 0;
			}
			&.on {
				.bg-image("../../components/images/star24_on");
			}
			&.off {
				.bg-image("../../components/images/star24_off");
			}
			&.half {
				.bg-image("../../components/images/star24_half");
			}
		}
	}
}
</style>