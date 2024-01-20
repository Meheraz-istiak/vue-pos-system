<template>
  <div>
    <Card noborder>

  <template v-if="loopshowdata !== null">
    <div
        class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center"
      >

        <div class="col-md-12">
          <Button icon="heroicons-outline:plus" :text="pnamedata" btnClass="btn-dark " class="btn btn-sm mr-auto"
              @click="toggleModal" />

          <!-- <Button @click="toggleModal" class="btn btn-dark btn-sm" icon="heroicons-outline:plus">Add Item</Button> -->
        </div>

        <InputGroup
          v-model="searchTerm"
          placeholder="Search"
          type="text"
          prependIcon="heroicons-outline:search"
          merged
        />
      </div>

      <vue-good-table
        :columns="columns"
         styleClass=" vgt-table bordered condensed"
        :rows="loopshowdata"


        :pagination-options="{
          enabled: false,
          perPage: perpage,
        }"
        :search-options="{
          enabled: false,
          externalQuery: searchTerm,
        }"
        :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
          selectioninfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectinfo: true, // disable the select info-500 panel on top
          selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
        }"
      >
        <template v-slot:table-row="props">

          <span v-if="props.column.field == 'name'" class="flex">
            <span class="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none">

            </span>
            <span
              class="text-sm text-slate-600 dark:text-slate-300 capitalize"
              >{{ props.row.name }}</span
            >
          </span>



          <span v-if="props.column.field == 'isActive'" class="block w-full">
            <span
              class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
              :class="`${
                props.row.isActive === null? 'text-success-500 bg-success-500': ''
              }
            ${
              props.row.isActive === 'false'
                ? 'text-warning-500 bg-warning-500'
                : ''
            }
            ${
              props.row.status === 'cancled'
                ? 'text-danger-500 bg-danger-500'
                : ''
            }

             `"
            >

              {{ props.row.isActive == null ? 'active' : 'inactive' }}
            </span>
          </span>


           <span class="block w-full text-center text-center mx-auto"  v-if="props.column.field == 'action'">

              <button  @click="showdata(props.row.enptId)" >
                <span class="text-xl action-btn"

                  ><Icon icon="heroicons:pencil-square"/>

                </span>
              </button>
                <button @click="deleteLookup(props.row.enptId)">
                  <span class="text-xl action-btn"
                  ><Icon icon="heroicons-outline:trash"
                /></span></button>
              </span>
        </template>
        <template #pagination-bottom="props">
          <div class="py-4 px-3">
            <Pagination
              :total="50"
              :current="current"
              :per-page="perpage"
              :pageRange="pageRange"
              @page-changed="current = $event"
              :pageChanged="props.pageChanged"
              :perPageChanged="props.perPageChanged"
              enableSearch
              enableSelect
              :options="options"
            >
              >
            </Pagination>
          </div>
        </template>
      </vue-good-table>
     <div>

     </div>


  </template>

    </Card>
  </div>

  <template>
    <div>
        <div class="border-t-2  border-solid border-black-600">
        <Button  class="mt-1 mb-2" text="Add Lookup"  btnClass="btn-outline-dark btn-sm" />
       </div>
      <Modal
        title="User Lookup"
        label="Modal title"
        :activeModal="show"
        @close="show = false"
        themeClass="bg-primary-500"
      >
      <div class="text-base text-slate-600 dark:text-slate-300">
        <Textinput
          label="Lookup Name"
          type="name"
          placeholder="Type your Lookup Name"
          name="smallsize2"
          v-model="lookupdata.name"
        />
        <Textinput
          label="Description"
          type="Description"
          placeholder="Enter your Lookup Description "
          name="Description"
          v-model="lookupdata.description"
        />
        <Textinput
          label="moderation"
          type="text"
          placeholder="Enter your Lookup moderation "
          name="moderation"
          v-model="lookupdata.moderation"
        />

      </div>
      <div class="flex items-center pt-3">
          <input checked id="checked-checkbox"
          type="checkbox"
          value=""
          v-model="lookupdata.isActive"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">

          <label
          for="checked-checkbox"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lookup Status</label>
      </div>
      <template v-slot:footer>
        <Button
          text="Close"
          btnClass="btn-primary px-4 py-1"
          @click="toggleModal1"
        />
        <Button
          text="Submit"
          btnClass="btn-dark px-4 py-1"
          @click="submitData"
        />
      </template>
      </Modal>
    </div>
  </template>

  <template>
    <div>
        <div class="border-t-2  border-solid border-black-600">
        <Button  class="mt-1 mb-2" text="Edit Lookup"  btnClass="btn-outline-dark btn-sm" />
       </div>
      <Modal
        title="edit Lookup"
        label="Modal title"
        :activeModal="updateshow"
        @close="updateshow = false"
        themeClass="bg-primary-500"
      >
      <div class="text-base text-slate-600 dark:text-slate-300">
        <Textinput
          label="Lookup Name"
          type="name"
          placeholder="Type your Lookup Name"
          name="smallsize2"
          v-model="uplookupdata.name"
        />
        <Textinput
          label="Description"
          type="Description"
          placeholder="Enter your Lookup Description "
          name="Description"
          v-model="uplookupdata.description"
        />
        <Textinput
          label="moderation"
          type="text"
          placeholder="Enter your Lookup moderation "
          name="moderation"
          v-model="uplookupdata.moderation"
        />

      </div>
      <div class="flex items-center pt-3">
          <input checked id="checked-checkbox"
          type="checkbox"
          value=""
          v-model="uplookupdata.isActive"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">

          <label
          for="checked-checkbox"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lookup Status</label>
      </div>
      <template v-slot:footer>
        <Button
          text="Close"
          btnClass="btn-primary px-4 py-1"
          @click="updateModal1"
        />
        <Button
          text="Submit"
          btnClass="btn-dark px-4 py-1"
          @click="updateData"
        />
      </template>
      </Modal>
    </div>
  </template>

</template>
<script>
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Textinput from "@/components/Textinput";
import Dropdown from "@/components/Dropdown";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import {ref} from 'vue'
import { MenuItem } from "@headlessui/vue";
import Tooltip from "@/components/Tooltip";
import axios from "@/http/axios";
import { useToast } from "vue-toastification";
import Swal from 'sweetalert2';
import { defineProps } from 'vue';
const toast = useToast();

const lookupParentdata =ref(0)

export default {
  components: {
    Pagination,
    InputGroup,
    Dropdown,
    Tooltip,
    Icon,
    Card,
    MenuItem,
    Textinput,
    Button,
    Modal
  },
  props: {
    pshowdata:'',
    loopshowdata:'',
    pnamedata:''

  },
   created()
   {
    this.fetchData();

   },

   methods: {

      toggleModal(){
      this.show=true
      },
      toggleModal1(){
      this.show=false
      },
      async submitData(){
        this.lookupdata.parent=this.pshowdata
        await axios.post("LookUp/lookupInsert",this.lookupdata)

        .then((res)=>{
          this.show=false
          this.loopshowdata
          toast.success(res.data.mgs ,{timeout:1000});

        }

        )

      },

      updateModal(){
      this.updateshow=true
      },
      updateModal1(){
      this.updateshow=false
      },
      async updateData(){

        await axios.post("LookUp/LookupEditById",this.uplookupdata)

        .then((res)=>{
          this.updateshow=false
          this.fetchData();
          toast.success(res.data.mgs ,{timeout:1000});

        }

        )

      },

     async showdata(id){
      // console.log(id)
        this.updateshow=true
         await axios.get("LookUp/GetLookUpById/"+id)
        .then((res)=>{
          this.uplookupdata =res.data
        })

      },

      async deleteLookup(id){
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

              const res = axios.delete('Lookup/LookupDelete/'+id)
              .then((res)=>{
                if(res.status==200){
                  Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.fetchData();
                }

               } )

            }
          })
     },

    async fetchData() {
      try {
        const response = await axios.get('LookUp/getLookUpList');
        //  console.log('lookup',response.data)
         this.lookupTable=response.data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },

  data() {
    return {
      show:false,
      updateshow:false,
      lookupTable:[],
      lookupParentdata:[],
      maindata:[],
      lookupdata:
        {
         name:'',
         description:'',
         parent:'',
         moderation:'',
         isActive:''
        },
        uplookupdata:
        {
         name:'',
         description:'',
         parent:'',
         moderation:'',
         isActive:''
        },
      current: 1,
      perpage: 10,
      pageRange: 5,
      searchTerm: "",
      actions: [
          {
            name: "edit",
            icon: "heroicons:pencil-square",
          },
          {
            name: "delete",
            icon: "heroicons-outline:trash",
          },
        ],
      options: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "5",
          label: "5",
        },
      ],

      columns: [
        // {
        //   label: "Id",
        //   field: "id",
        // },
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Description",
          field: "description",
        },
        {
          label: "Status",
          field: "isActive",
        },
        // {
        //   label: "Parent",
        //   field: "parent",
        // },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.success-button {
background-color: green;
color: white;
}
.action-btn{
  @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}
</style>
