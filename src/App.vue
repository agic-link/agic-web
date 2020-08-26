<template>
    <div id="app">
        <Header msg="This is Header"/>
        <router-view></router-view>
        <Footer msg="This is Footer"/>
    </div>
</template>

<script>

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
    name: 'Home',
    components: {
        Header, Footer
    },
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
}
</style>
