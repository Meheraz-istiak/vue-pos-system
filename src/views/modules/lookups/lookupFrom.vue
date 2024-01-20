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
            <Button icon="heroicons-outline:plus" text="Add Lookup" btnClass="btn-dark w-full btn-sm block  "
              @click="toggleModal" />


          </div>
          <div class="h-full pb-10 px-6" data-simplebar>
            <ul class="list ">

              <li v-for="item in pData" :key="item.enptId" class="pt-2">

                <div class="input-group flex" @click="selectMenuItem(item.enptId)"
                        :class="{ 'selected': selectedIndex === item.enptId }">

                  <button class="items-center flex cursor-pointer px-2 py-3 rounded mr-auto"
                  @click="fillter = item.enptId,
                   showdata(item.enptId,item.name)"
                  :class="fillter === item.enptId
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
                    <span class="capitalize text-sm" :class="[
                      fillter === item.id ? ' font-medium' : 'font-normal',
                    ]">{{ item.name }}

                    </span>

                  </div>
                  <span class="flex-none font-normal capitalize text-sm">
                    {{ item.count }}</span>

                  </button>


                  <div class="input-group-prepend">


                  <button class="px-2 py-3">
                    <span @click="peditdata(item.enptId)" class="text-xl action-btn ">
                      <Icon icon="heroicons:pencil-square" />
                    </span>
                  </button>
                  <button>
                    <span @click="pdeleteData(item.enptId)" class="text-xl action-btn ">
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
        <LookUpTable :pnamedata="pnamedata" :pshowdata="pshowdata" :loopshowdata="loopshowdata" />
        <p v-if="loopshowdata == null" class="pt-12 px-12" id="lookup">Selete LookUp</p>
      </Card>

    </div>

  </div>
  <!-- modelParent submit From -->
  <template>
    <div>
      <Modal title="LookUp" label="Modal title" :activeModal="show" @close="show = false" themeClass="bg-primary-500">
        <div class="text-base text-slate-600 dark:text-slate-300">
          <Textinput label="Parent Name" type="name" placeholder="Type Your Parent Name" name="smallsize2"
            v-model="roleData.name" />
          <Textinput label="Parent Description" type="Description" placeholder="Enter Your Parent Description "
            name="Description" v-model="roleData.description" />
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
      <Modal title="edit LookUp" label="Modal title" :activeModal="show1" @close="show1 = false" themeClass="bg-primary-500">
        <div class="text-base text-slate-600 dark:text-slate-300">
          <Textinput label="Parent Name" type="name" placeholder="Type Your Parent Name" name="smallsize2"
            v-model="updateData.name" />
          <Textinput label="Parent Description" type="Description" placeholder="Enter Your Parent Description "
            name="Description" v-model="updateData.description" />
        </div>

        <template v-slot:footer>
          <Button text="Close" btnClass="btn-primary px-4 py-1" @click="toggleModalupdate" />
          <Button text="Update" btnClass="btn-dark px-4 py-1" @click="pUpdateData" />
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
import LookUpTable from './lookupTable.vue'
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
  parentData()

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
const roleData = ref({
  name: '',
  description: ''
})
const show1 = ref(false);

const toggleModalupdate = () => {
  show1.value = !show1.value;
};
const updateData = ref({
  name: '',
  description: ''
})

const fillter = ref();


// parent sidebar data show
let pData = ref(null)
const parentData = async () => {
  let res = await axios.get("LookUp/getLookUpNullParentList")
  // console.log(res.data)
  pData.value = res.data
}
async function peditdata(id) {
  console.log('lookup',id)
  let res = await axios.get("LookUp/GetLookUpById/" + id)
  show1.value = true
  updateData.value=res.data
  console.log('upadte data',res.data)
  // console.log(res)

}
const pdeleteData = async (id) => {
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

              const res = axios.delete('LookUp/lookupDelete/'+id)
              .then((res)=>{
                if(res.status==200){
                  Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              parentData()
                }

               } )

            }
          })
     }

const pUpdateData = async () => {
  let res = await axios.post("LookUp/LookupEditById", updateData.value)
  console.log('update',res)
  var Lookdata = res.data;
  if (res.status == 200) {
    show1.value = false
    toast.success(Lookdata.mgs, { timeout: 1000 });
    parentData()
  } else {
    toast.error(Lookdata.mgs, { timeout: 1000 });
  }
  updateData.value = {
    name: '',
    description: ''
  };
}


const pshowdata = ref(null)
const pnamedata = ref(null)

const loopshowdata = ref(null)

// parant id wise table data show
async function showdata(id ,name,e) {
  let res = await axios.get("LookUp/GetLookupChildByParentID/" + id)
  console.log('menu', res)
  loopshowdata.value = res.data
  pshowdata.value = id
  pnamedata.value = name
  // pshowdata.value=res.data

}

// parent data store
const submitData = async () => {
  let res = await axios.post("LookUp/lookupInsert", roleData.value)
  // console.log(res)
  var Lookdata = res.data;
  if (res.status == 200) {
    show.value = false
    toast.success(Lookdata.mgs, { timeout: 1000 });
    parentData()
  } else {
    toast.error(Lookdata.mgs, { timeout: 1000 });
  }
  roleData.value = {
    name: '',
    description: ''
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