<template>
   <div class="pt-4 pb-4">
       <h3 class="pl-2">Privilages</h3>
   </div>
    <div :class="parentClass">
      <div
        class="accordion shadow-base dark:shadow-none rounded-md"
        v-for="(item, i) in items"
        :key="i"
      >
        <div
          :class="
            activeIndex === i
              ? 'bg-slate-50 dark:bg-slate-700 dark:bg-opacity-60 rounded-t-md '
              : 'bg-white dark:bg-slate-700  rounded-md'
          "
          class="flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4"
          @click="activeIndex = activeIndex === i ? null : i"
        >
          {{ item.name }}


          <span
            class="text-slate-900 dark:text-white text-[22px] transition-all duration-300 h-5"
            :class="activeIndex === i ? 'rotate-180 transform' : ''"
            ><Icon icon="heroicons-outline:chevron-down"
          /></span>
        </div>
        <Transition
          enter-active-class="submenu_enter-active"
          leave-active-class="submenu_leave-active"
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          @before-leave="beforeLeave"
          @leave="leave"
          @after-leave="afterLeave"
        >
          <div
            class="text-sm text-slate-600 font-normal bg-white dark:bg-slate-900 dark:text-slate-300 rounded-b-md"
            v-if="i === activeIndex"
            :class="[
              i === activeIndex
                ? 'dark:border dark:border-slate-700 dark:border-t-0'
                : 'l',
            ]"
          >
            <div class="px-8 py-4" v-for="data in item.parent" :key="data.id">
               <!-- <div class="flex items-center justify-between w-full p-4 rounded-xl font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                {{ item.content }}

               </div> -->
               <div   class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <div class="w-2/5 ">
                  <input  type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label for="bordered-checkbox-2" class="w-96 py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ data.name }}</label>
                </div>

                  <div class="flex items-center pl-2 w-3/5 mt-2.5 mb-2.5">

                    <label class="relative inline-flex items-center mr-4 cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" >
                    <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Create</span>
                    </label>

                    <label class="relative inline-flex items-center mr-4 cursor-pointer">
                    <input type="checkbox"  value="" class="sr-only peer" >
                    <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
                    <span class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Read</span>
                    </label>

                    <label class="relative inline-flex items-center mr-4 cursor-pointer">
                    <input type="checkbox"  value="" class="sr-only peer" >
                    <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    <span class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Write</span>
                    </label>

                    <label class="relative inline-flex items-center mr-4 cursor-pointer">
                    <input type="checkbox"  value="" class="sr-only peer" >
                    <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                    <span class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Delete</span>
                    </label>


                  </div>



              </div>
              <!-- END PARETN -->
              <div class="px-4 py-2">
              <div  v-for="data1 in data.child" :key="data1.id" class="flex items-center pl-4 mt-2 border border-gray-200 rounded dark:border-gray-700">
                <div class="w-1/2 ">
                  <input  id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label for="bordered-checkbox-2" class="w-96 py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ data1.name }}</label>
                </div>

                  <div class="flex items-center pl-2 w-3/4 mt-2.5 mb-2.5">

                    <label class="relative inline-flex items-center mr-1.5 cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" >
                    <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Create</span>
                    </label>

                    <label class="relative inline-flex items-center mr-1.5 cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" >
                    <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
                    <span class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Read</span>
                    </label>

                    <label class="relative inline-flex items-center mr-1.5 cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" >
                    <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    <span class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Write</span>
                    </label>

                    <label class="relative inline-flex items-center mr-1.5 cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" >
                    <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                    <span class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Delete</span>
                    </label>


                  </div>



              </div>
              </div>

            </div>
          </div>
        </Transition>
      </div>
    </div>
  </template>

  <script>
  import Icon from "@/components/Icon";
  import axios from "@/http/axios";
  import { useToast } from "vue-toastification";
  import Swal from 'sweetalert2';

  const toast = useToast();
  export default {
    components: {
      Icon,
    },
    props: {
      parentClass: {
        type: String,
        default: "",
      },
      items:''
    },

    data() {
      return {
        activeIndex: 0,
      };
    },
    methods: {




      beforeEnter(element) {
        requestAnimationFrame(() => {
          if (!element.style.height) {
            element.style.height = "0px";
          }

          element.style.display = null;
        });
      },
      enter(element) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            element.style.height = `${element.scrollHeight}px`;
          });
        });
      },
      afterEnter(element) {
        element.style.height = null;
      },
      beforeLeave(element) {
        requestAnimationFrame(() => {
          if (!element.style.height) {
            element.style.height = `${element.offsetHeight}px`;
          }
        });
      },
      leave(element) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            element.style.height = "0px";
          });
        });
      },
      afterLeave(element) {
        element.style.height = null;
      },
    },
  };
  </script>
