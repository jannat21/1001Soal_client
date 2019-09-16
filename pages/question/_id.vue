<template>
    <div class="container">
        <h1>QUESTION</h1>
        <h3>{{id}}</h3>
    </div>
</template>
<script>
export default {
    mounted(){
        console.log(this.$route);
    },
    data(){
        return {
            id:this.$route.params.id
        }
    }

}
</script>
