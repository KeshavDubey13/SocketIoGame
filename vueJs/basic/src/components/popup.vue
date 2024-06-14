<script setup>

const props = defineProps(["win_lose"
    ])
</script>
<template>

<div class="box">
    <div class="subBox">
        <h3>{{ props.win_lose}}</h3>
    </div>
</div>
</template>
<style scoped>
.box{
    position: absolute;
    width: 500px;
    height: 200px;
    background-color: rgb(54, 54, 54);
}
.subBox{
    text-align: center;
    padding: 10px 20px;
}
.subBox>h3{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
}

</style>