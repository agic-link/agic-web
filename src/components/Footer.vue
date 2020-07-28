<template>
    <div class="footer-title">
        <el-row type="flex" justify="center">
            <el-col :span="8">
                <div>资源</div>
                <div class="content">隐私政策</div>
            </el-col>
            <el-col :span="8">
                <div>开发者</div>
                <div class="content">Github</div>
                <div class="content">智能合约</div>
            </el-col>
            <el-col :span="8">
                <div>社交媒体</div>
                <div class="content" @click="openWindows('https://discord.gg/jh6a92U')">Discord</div>
                <div class="content" @click="openWindows('https://t.me/Agiclink')">电报群</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    //todo 无法window.open
    export default {
        name:'Footer',
        methods:{
            openWindows(url){
                window.open(url);
            }
        }
    }
</script>

<style lang="scss">

    .footer-title {
        padding-top: 0.3rem;
        font-size: 0.2rem;

        .content{
            font-size: 0.15rem;
            padding-top: 0.15rem;
            color: #b2bfce;
            cursor: pointer;
        }
    }

</style>