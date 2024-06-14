<script setup>

    const props = defineProps(["userId",
        "img"
    ])
</script>

<template>
    <div class="mainDiv">
        <div class="imges">
            <img :src="props.img" />
           
        </div>
        <div class="userData">
            <p class="pera">{{ props.userId }}</p>
        </div>
    </div>
</template>

<style scoped>

.mainDiv{
   width: 300px;
   height: 300px;
   display: flex
}
.imges>img{
    aspect-ratio: 1/1;
    width: 100%;
   object-fit: contain;
   
    
}
.userData{
    color: white;
}

</style>

