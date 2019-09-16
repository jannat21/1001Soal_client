<template>
    <div>
        <div class="alert alert-success text-center"><h1>LOGO</h1><small>{{title}}</small></div>
    </div>
</template>
<script>
export default {
    props:{title:{type:String,required:true}}
}
</script>
