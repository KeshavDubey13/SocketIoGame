<script setup>

  import {io} from "socket.io-client"
  import {ref,onMounted,onUnmounted,} from "vue"
  import card from "../components/card.vue"
  import img1 from "../img/62.jpg"
  import img2 from "../img/75.jpg"
  import cylnder from "../img/de.jpg"
  import popup  from "../components/popup.vue"
  import tiggered1 from "../img/bul1.png"
  import tiggered2 from "../img/bul2.png"
  import tiggered3 from "../img/bul3.png"
  import tiggered4 from "../img/bul4.png"
  import tiggered5 from "../img/bul5.png"
  const triggedArray = [tiggered1,tiggered2,tiggered3,tiggered4,tiggered5]

  

  const socket = io("http://localhost:3000/")
  const buttletCylender = [false,false,false,false,false,false]
  const show = ref(false)
  const list = ref([])
  const count = ref(-1)
  const win_lose = ref("")
  const isStarted = ref(false)


  const myInterval = setInterval(()=>{
      if (list.value.length >=2) {
  const data = document.getElementById('cylnder')
    var id = null
  let rotate = 0;
   clearInterval(id)
   id = setInterval(frame,.1)
   function frame(){
    if (rotate === 720) {
        clearInterval(id)
    }
    else{
        rotate = rotate+2;
        data.style.transform =`rotate(${rotate}deg)`
        
    }
   }
      clearInterval(myInterval)   
    }
  },100)
 

  



onMounted(()=>{



socket.on("welcome" ,(s)=>{


})

socket.on("list",(e)=>{
    list.value = e.list;
    
    if (e.list[0] != socket.id) {
      const btn =  document.getElementById("btn").disabled=true
      document.getElementById("btn").style.backgroundColor="rgba(235, 196, 196, 0.433)"
      document.getElementById("btn").style.cursor="not-allowed"
    }
    else{
      const btn =  document.getElementById("btn").disabled=false
      document.getElementById("btn").style.backgroundColor="rgb(208, 54, 54)"
      document.getElementById("btn").style.cursor="pointer"
    }
    
})



socket.on("playerId",(e)=>{
    buttletCylender[e.rando]=true
    isStarted.value= true
    count.value = e.show
    
    if (e.ids != list.value) {
      const btn =  document.getElementById("btn").disabled=false
      document.getElementById("btn").style.backgroundColor="rgb(208, 54, 54)"
      document.getElementById("btn").style.cursor="pointer"
    }
    else{
      const btn =  document.getElementById("btn").disabled=true
      document.getElementById("btn").style.backgroundColor="rgba(235, 196, 196, 0.433)"
      document.getElementById("btn").style.cursor="not-allowed"
    }
    
})
 socket.on('resones',(e)=>{
       win_lose.value = e
       show.value = true
    })
    socket.on ('win',(e)=>{
     win_lose.value =e
     show.value = true
    })

})
onUnmounted(()=>{
  socket.disconnect()
  
})


const fun =()=>{
  
  socket.emit("start",{
    id:socket.id,
  
})



}



</script>




<template>
  <div class="mainclass">
    <popup :win_lose="win_lose" v-if="show"></popup>
      <div class="subMainClass" >
          <div class="imges">
                <card  class="card" :img="img1" :userId="list[0]"/>
               <div>
                <div class="cylanderDiv">
                  <img :src="isStarted ? triggedArray[count] : cylnder" alt="" id="cylnder"/>
                  
                </div>
                
               </div>
               
                <card class="card" :img="img2" :userId="list[1]"/>
          </div>
          <div class="gunDiv">
              <button @click="fun" id="btn" >Shoot</button>
          </div>
      </div>
      
  </div>

</template>

<style>


.mainclass{
  position: absolute;
  width: 100%;
  height: 100vh;
}
.subMainClass{
  width: 90%;
  background-color: rgb(14, 12, 12);
  height: 400px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.imges{
  width: 90%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.card{
  position: relative;
 font-weight: 900;
 width: 100%;

}
#cylnder{
  width: 50%;
  height: 100%;
}
.cylanderDiv{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.gunDiv{
  bottom: 40px;
  position: absolute;
  text-align: center;
  width: 100%;
}
.gunDiv>img{
  width: 100%;
}
#btn{
  padding: 5px 40px;
  background-color: rgba(235, 196, 196, 0.433);
  border-radius: 5px;
  outline: none;
  border: none;
  font-weight: 800;
  color: rgb(39, 39, 39);
  font-size: 15px;
 
}
</style>
