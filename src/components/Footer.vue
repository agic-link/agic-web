<template>
    <div class="footer-title">
        <el-row type="flex" justify="center">
            <el-col :span="8">
                <div>{{ $t('resources') }}</div>
                <div class="content"><a @click="openWindows('/#/PrivacyPolicy')">{{ $t('privacyPolicy') }}</a></div>
            </el-col>
            <el-col :span="8">
                <div>{{ $t('developer') }}</div>
                <div class="content"><a @click="openWindows('https://github.com/agic-link')">Github</a></div>
                <div class="content">
                    <a @click="openWindows('https://github.com/agic-link/agic-protocol')">{{ $t('contract') }}</a>
                </div>
            </el-col>
            <el-col :span="8">
                <div>{{ $t('social') }}</div>
                <div class="content"><a @click="openWindows('https://discord.gg/jh6a92U')">Discord</a></div>
                <div class="content"><a @click="openWindows('https://t.me/Agiclink')">Telegram</a></div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="9" :offset="17" style="padding-top: 30px">
                <div>
                    <a style="font-size: 0.17rem;">{{ $i18n.locale === 'zh' ? '语言' : 'language' }}:</a>
                    <el-dropdown @command="handleCommand" trigger="click">
                        <span class="el-dropdown-link">
                            {{ $i18n.locale === 'zh' ? '中文' : 'English' }}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="zh">中文</el-dropdown-item>
                            <el-dropdown-item command="en">English</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="20" style="padding-top: 30px">
                <div style="font-size: 0.1rem;margin-bottom: 30px">Copyright © 2020 Agic</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    methods: {
        openWindows(url) {
            window.open(url, "_blank");
        },
        handleCommand(command) {
            this.$i18n.locale = command;
            localStorage.setItem("locale", command);
        }
    }
}
</script>

<style lang="scss">

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 0.17rem;
}

.el-icon-arrow-down {
    font-size: 0.17rem;
}

.footer-title {
    padding-top: 0.3rem;
    font-size: 0.2rem;

    .content {
        font-size: 0.15rem;
        padding-top: 0.15rem;
        color: #b2bfce;

        a {
            cursor: pointer;
        }
    }
}

</style>