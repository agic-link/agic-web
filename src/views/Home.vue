<template>
    <div>
        <Header msg="This is Header"/>
        <HomeBody msg="This is HomeBody"/>
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
        }
    }
</script>
