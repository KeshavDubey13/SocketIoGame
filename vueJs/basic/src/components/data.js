import {ref,onMounted,onUnmounted} from "vue"

export const useMouse=()=>{ 

const left = ref(0)
 const right= ref(0)
 const update=(event)=>{
  left.value = event.pageX;
  right.value = event.pageY;
 }

 onMounted(()=>window.addEventListener("mousemove",update))
onUnmounted(()=>window.addEventListener("mousemove",update))

return {left,right}

}