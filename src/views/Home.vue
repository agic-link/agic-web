<template>
    <div>
        <Header @headerWallet="getWallet" msg="This is Header"/>
        <HomeBody :bodyWallet="wallet" msg="This is HomeBody"/>
        <Footer msg="This is Footer"/>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import HomeBody from '../components/HomeBody.vue'
import Footer from '../components/Footer.vue'

export default {
    name: 'Home',
    components: {
        Header, HomeBody, Footer
    },
    data() {
        return {
            wallet: ''
        }
    },
    methods: {
        getWallet: function (headerWallet) {
            this.wallet = headerWallet;
        }
    }
}
</script>
