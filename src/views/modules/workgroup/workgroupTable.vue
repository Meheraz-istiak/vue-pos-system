<template>

     <Accordion  :items="items"/>
</template>

<script setup>
import Accordion from './accordion.vue';
import {ref,onMounted,onUpdated } from 'vue'
import axios from "@/http/axios";
import { useToast } from "vue-toastification";
import Swal from 'sweetalert2';
const toast = useToast();

const items = ref([]);
onMounted  (async () => {
       await axios.get("Privilege/GetModuleGroupModuleParentModuleChild")
       .then((res)=>{
            console.log('check',res.data)
            items.value =res.data
          }).catch((error)=>{

            toast.error('Something was wrong!')
          })
    });

    onUpdated  (async () => {
       await axios.get("Privilege/GetModuleGroupModuleParentModuleChild")
       .then((res)=>{
            console.log('check',res.data)
            items.value =res.data
          }).catch((error)=>{

            toast.error('Something was wrong!')
          })
    });

// const items = [
//         {
//           id: 0,
//           text: 'office boss',
//           children: [
//             {
//             id: 2,
//             text: 'finace',
//           }
//          ]
//         },

//         {
//           id: 1,
//           text: 'HR',
//           children: [
//             {
//             id: 2,
//             text: 'project manager',
//             childer2:[{
//               id: 3,
//               text: 'emplyoess',
//             },
//             {
//               id: 4,
//               text: 'pio',
//             }
//           ]
//           }
//         ]

//         }

//         , {
//           id: 5,
//           text: 'Admin'
//         }
//       ]
</script>

<style lang="scss" scoped>

</style>