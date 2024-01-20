<template>
  <div class="md:flex md:space-x-5 email_height overflow-hidden relative rtl:space-x-reverse">
    <div class="transition-all duration-150" :class="[
      width < 1280
        ? ' absolute h-full top-0 md:w-[260px] w-[200px] z-[999]'
        : 'flex-none min-w-[260px]',
      width < 1280 && mobileEmailSidebar
        ? 'ltr:left-0  rtl:right-0'
        : 'ltr:-left-full rtl:-right-full ',
    ]">
      <Card bodyClass=" h-full flex flex-col " className="h-full">

        <div class="flex-1 h-full">
          <div class="bg-white dark:bg-slate-900 rounded-md sticky top-0 mx-6 mt-6">
            <Button icon="heroicons-outline:plus" text="Work Group" btnClass="btn-dark w-full btn-sm block  "
              @click="toggleModal" />


          </div>
          <div class="h-full pb-10 px-6" data-simplebar>
            <ul class="list ">

              <li v-for="item in workGroupMenuData" :key="item.encptId" class="pt-2">

                <div class="input-group flex" @click="selectMenuItem(item.encptId)"
                        :class="{ 'selected': selectedIndex === item.encptId }">

                  <button class="items-center flex cursor-pointer px-2 py-3 rounded mr-auto"
                  @click="fillter = item.encptId,
                   showdata(item.encptId,item.name)"
                  :class="fillter === item.encptId
                      ? ' text-slate-900 dark:bg-slate-700 dark:text-slate-200'
                      : '  text-slate-600 dark:text-slate-300 '
                    ">

                  <div class="flex-1 flex space-x-2 rtl:space-x-reverse">
                    <span class="text-xl" :class="[
                      item.id === 'sent'
                        ? ' transform rotate-[30deg]'
                        : '',
                      fillter === item.id
                        ? ' text-slate-900 dark:text-slate-100'
                        : ' text-slate-400 dark:text-slate-400',
                    ]">
                      <Icon :icon="item.icon" />
                    </span>
                    <span class="text-sm" :class="[
                      fillter === item.id ? ' font-medium' : 'font-normal',
                    ]">{{ item.name }}

                    </span>

                  </div>
                  <span class="flex-none font-normal capitalize text-sm">
                    {{ item.count }}</span>

                  </button>


                  <div class="input-group-prepend">


                  <button class="px-2 py-3">
                    <span @click="workgroup_editdata(item.encptId)" class="text-xl action-btn ">
                      <Icon icon="heroicons:pencil-square" />
                    </span>
                  </button>
                  <button>
                    <span @click="workgroupdeleteData(item.encptId)" class="text-xl action-btn ">
                      <Icon icon="heroicons-outline:trash" />
                    </span>
                  </button>

                  </div>

                </div>

              </li>
            </ul>
          </div>
        </div>

      </Card>
    </div>

    <div class="flex-1 md:w-[calc(100%-320px)]" :class="width < 768 ? 'h-full' : ''">
      <Card bodyClass="p-0 h-full  relative" :className="width < 1024 ? 'h-full' : ''">
        <workgroupTable :pnamedata="pnamedata" :moduleByIdshowdata="moduleByIdshowdata" :moduleshowdata="moduleshowdata" />
        <!-- <p v-if="moduleshowdata == null" class="pt-12 px-12" id="lookup">Selete LookUp</p> -->
      </Card>

    </div>

  </div>
  <!-- modelParent submit From -->
  <template>
    <div>
      <Modal title="Work Group" label="Modal title" :activeModal="show" @close="show = false" themeClass="bg-primary-500">
        <div class="text-base text-slate-600 dark:text-slate-300">
          <Textinput label="Work Group Name" type="name" placeholder="Type Your Work Group Name" name="smallsize2"
            v-model="workGroupData.name" />

          <Textinput label="Work Group Description" type="Description" placeholder="Enter Your Work Group Description "
            name="Description" v-model="workGroupData.description" />

          <Textinput label="Work Group Icon" type="Icon" placeholder="Enter Your Work Group Icon "
            name="icon" v-model="workGroupData.icon" />

          <Textinput label="Work Group parent" type="Icon" placeholder="Enter Your Work Group parent "
            name="parent" v-model="workGroupData.parent" />
        </div>

        <template v-slot:footer>
          <Button text="Close" btnClass="btn-primary px-4 py-1" @click="toggleModal" />
          <Button text="Submit" btnClass="btn-dark px-4 py-1" @click="submitData" />
        </template>
      </Modal>
    </div>
  </template>
   <!-- modelParent updatesubmit From -->
   <template>
    <div>
      <Modal title="Edit Module" label="Modal title" :activeModal="show1" @close="show1 = false" themeClass="bg-primary-500">
        <div class="text-base text-slate-600 dark:text-slate-300">
          <Textinput label="Work Group Name" type="name" placeholder="Type Your Work Group Name" name="smallsize2"
            v-model="updateData.name" />

          <Textinput label="Work Group Description" type="Description" placeholder="Enter Your Work Group Description "
            name="Description" v-model="updateData.description" />

          <Textinput label="Work Group Icon" type="Icon" placeholder="Enter Your Work Group Icon "
            name="icon" v-model="updateData.icon" />

            <Textinput label="Work Group parent" type="Icon" placeholder="Enter Your Work Group parent "
            name="parent" v-model="updateData.parent" />
        </div>

        <template v-slot:footer>
          <Button text="Close" btnClass="btn-primary px-4 py-1" @click="toggleModalupdate" />
          <Button text="Update" btnClass="btn-dark px-4 py-1" @click="moduleUpdateData" />
        </template>
      </Modal>
    </div>
  </template>



</template>



<script setup>

import Icon from "@/components/Icon";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Textinput from "@/components/Textinput";
import { computed, ref, watch, onMounted } from "vue";
import axios from "@/http/axios";
import { useToast } from "vue-toastification";
import { useEmailStore } from "@/store/email";
import workgroupTable from './workgroupTable.vue'
import Swal from 'sweetalert2';



let selectedIndex =ref(null)

function selectMenuItem(enptId)
{
    if (this.selectedIndex === enptId) {
            // Deselect the currently selected item if clicked again
            selectedIndex.value = null;
          } else {
            // Select the clicked item
            selectedIndex.value = enptId;
          }
}


const width = ref(0);

const handleResize = () => {
  width.value = window.innerWidth;
};
onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
  ModuleData()

});

let store = useEmailStore();
const openEmail = () => {
  store.openEmail();
};
// store  computed
const singleEmailModal = computed(() => store.singleEmailModal);
const mobileEmailSidebar = computed(() => store.mobileEmailSidebar);

// dispatch closeMobileEmailSidebar
const closeMobileEmailSidebar = () => {
  store.closeMobileEmailSidebar();
};

const toast = useToast();
// Model form close open
const show = ref(false);
const toggleModal = () => {
  show.value = !show.value;
};

const fillter = ref();


const moduleByIdshowdata = ref(null)
const pnamedata = ref(null)

const moduleshowdata = ref(null)

// parant id wise table data show
async function showdata(id ,name) {
  console.log(id)
  let res = await axios.get("Module/GetModuleListByGroupId/" + id)
  console.log('menu', res)
  moduleshowdata.value = res.data
  moduleByIdshowdata.value = id
  pnamedata.value = name
  // pshowdata.value=res.data
}


// Module data store
const workGroupData = ref({
  name: '',
  description: '',
  icon:'',
  parent:''
})
const submitData = async () => {
  let res = await axios.post("Workgroup/WorkGroupInsert", workGroupData.value)
  let workReq = res.data;
  console.log(res)
  if (res.status == 200) {
    show.value = false
    toast.success(workReq.mgs, { timeout: 1000 });
    ModuleData()
  } else {
    show.value = false
    toast.error("Something was wrong!");
  }
  workGroupData.value = {
    name: '',
    description: '',
    icon:'',
    parent:''
  };
}

// parent sidebar data show
let workGroupMenuData = ref(null)
const ModuleData = async () => {
  let res = await axios.get("Workgroup/GetWorkGroupList")
  console.log('sdsdd',res.data)
  workGroupMenuData.value = res.data
}
// Deleted module
const workgroupdeleteData = async (id) => {
    console.log('ele',id)
      Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          })
          .then((response) => {
            if (response.isConfirmed) {

              const res = axios.post('Workgroup/DeleteWorKGroupById/'+id)
              .then((res)=>{
                if(res.status==200){
                  Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              ModuleData()
                }

               } )

            }
          })
     }

// Edit module
const show1 = ref(false);

const toggleModalupdate = () => {
  show1.value = !show1.value;
};

async function workgroup_editdata(id) {
  console.log('id',id)
  let res = await axios.get("Workgroup/GetWorkGroupById/" + id)
  console.log(res.data[0])
   show1.value = true
   updateData.value=res.data[0]
}
// update moduleData
const updateData = ref({
  name: '',
  description: '',
  icon:'',
  parent:''
})

const moduleUpdateData = async () => {

  let res = await axios.post("Workgroup/WorkGroupEditById", updateData.value)
  // console.log('update',res)
  var Lookdata = res.data;
  if (res.status == 200) {
    show1.value = false
    toast.success(Lookdata.mgs, { timeout: 1000 });
    ModuleData()
  } else {
    toast.error('Something was worng!');
  }
  updateData.value = {

    name: '',
    description: '',
    icon:'',
    parent:''
  };
}
</script>

<style lang="scss" scoped>
.selected {
      background-color:#f1f5f9;

       /* Change this to your desired background color */
    }

#lookup {
  margin-left: 310px;
}

.addbtn {
  margin-left: 150px;
  padding-top: 5px;
}

.action-btn{
  @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}
</style>