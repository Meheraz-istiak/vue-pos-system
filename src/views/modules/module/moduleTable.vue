<template>
    <div>
      <Card noborder>

    <template v-if="moduleshowdata !== null">
      <div
        >
        <div class="flex">
          <div class="flex-none w-22 h-14">
            <h4 class="font-weight-bold">{{ pnamedata }} : &nbsp;</h4>
            </div>
            <div class="flex-auto  w-64">
              <Button icon="heroicons-outline:plus" text="Add new" btnClass="btn-dark " class="btn btn-sm mr-auto"
                @click="toggleModal" />
            </div>

            <div class="flex-auto w-32">
              <InputGroup
            v-model="searchTerm"
            placeholder="Search"
            type="text"
            prependIcon="heroicons-outline:search"
            merged
          />
            </div>

            <!-- <Button @click="toggleModal" class="btn btn-dark btn-sm" icon="heroicons-outline:plus">Add Item</Button> -->
          </div>
        </div>

        <vue-good-table
          :columns="columns"
           styleClass=" vgt-table bordered condensed"
          :rows="moduleshowdata"


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
                  props.row.isActive === true? 'text-success-500 bg-success-500': ''
                }
              ${
                props.row.isActive === false
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

                {{ props.row.isActive == true ? 'active' : 'inactive' }}
              </span>
            </span>


             <span class="block w-full text-center text-center mx-auto"  v-if="props.column.field == 'action'">

                <button  @click="moduleByIdedit(props.row.encptId)" >
                  <span class="text-xl action-btn"

                    ><Icon icon="heroicons:pencil-square"/>

                  </span>
                </button>
                  <button @click="deletemodule(props.row.encptId )">
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
          <Button  class="mt-1 mb-2" text="Add Module"  btnClass="btn-outline-dark btn-sm" />
         </div>
        <Modal
          title="Module"
          label="Modal title"
          :activeModal="show"
          @close="show = false"
          themeClass="bg-primary-500"
        >
        <div class="text-base text-slate-600 dark:text-slate-300 ">
          <Textinput
            label="Module Name"
            type="name"
            placeholder="Type your Module Name"
            name="smallsize2"
            v-model="moduleData.name"
          />
          <Textinput
            label="URL"
            type="URL"
            placeholder="Enter your  Module url "
            name="URL"
            v-model="moduleData.url"
          />
          <Textinput
            label="SortOrder"
            type="text"
            placeholder="Enter your Module sortOrder "
            name="SortOrder"
            v-model="moduleData.sortOrder"
          />
          <Textinput
            label="ContentId"
            type="text"
            placeholder="Enter your contentId "
            name="contentId"
            v-model="moduleData.contentId"
          />
          <Textinput
            label="Icon"
            type="text"
            placeholder="Enter your icon "
            name="icon"
            v-model="moduleData.icon"
          />

          <Select

          label="Parent"
          placeholder="Enter your Parent"
          v-model="moduleData.parent"
          >
            <option v-for="drop in dropdownmenu" :key="drop.id" :value="drop.encptId">
              {{ drop.name }}
            </option>
          </Select>
        </div>
        <div class="text-base text-slate-600 dark:text-slate-300">

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
          title="edit module"
          label="Modal title"
          :activeModal="updateshow"
          @close="updateshow = false"
          themeClass="bg-primary-500"
        >
        <div class="text-base text-slate-600 dark:text-slate-300">
          <Textinput
            label="Module Name"
            type="name"
            placeholder="Type your Module Name"
            name="smallsize2"
            v-model="upmoduleupdata.name"
          />
          <Textinput
            label="URL"
            type="URL"
            placeholder="Enter your  Module url "
            name="URL"
            v-model="upmoduleupdata.url"
          />
          <Textinput
            label="SortOrder"
            type="text"
            placeholder="Enter your Module sortOrder "
            name="SortOrder"
            v-model="upmoduleupdata.sortOrder"
          />
          <Textinput
            label="ContentId"
            type="text"
            placeholder="Enter your contentId "
            name="contentId"
            v-model="upmoduleupdata.contentId"
          />
          <Textinput
            label="Icon"
            type="text"
            placeholder="Enter your icon "
            name="icon"
            v-model="upmoduleupdata.icon"
          />
          <Textinput
            label="parent"
            type="text"
            placeholder="Enter your Module parent "
            name="parent"
            v-model="upmoduleupdata.parent"
          />

        </div>
        <div class="flex items-center pt-3">

            <input checked id="checked-checkbox"
            type="checkbox"
            value=""
            v-model="upmoduleupdata.isActive"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">

            <label
            for="checked-checkbox"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Module Status</label>
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
            @click="updateModuleData"
          />
        </template>
        </Modal>
      </div>
    </template>

  </template>
  <script>
  import VueSelect from "@/components/Select/VueSelect";
  import Select from "@/components/Select";
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

  const toast = useToast();

  const lookupParentdata =ref(0)
  export default {
    components: {
      Select,
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
      moduleByIdshowdata:'',
      dropdownmenu:'',

      moduleshowdata:'',
      pnamedata:''
    },
     created()
     {



     },


     methods: {


        toggleModal(){
        this.show=true
        },
        toggleModal1(){
        this.show=false
        },
        async submitData(){
          this.moduleData.groupId=this.moduleByIdshowdata
          await axios.post("Module/ModuleInsert",this.moduleData)
          .then((res)=>{
            this.show=false

            toast.success(res.data.mgs ,{timeout:1000});

          }).catch((error)=>{
            this.show=false
            toast.error('Something was wrong!')
          })

        },

        updateModal(){
        this.updateshow=true
        },
        updateModal1(){
        this.updateshow=false
        },
        async updateModuleData(){

          await axios.post("Module/EditModuleById",this.upmoduleupdata)

          .then((res)=>{
            this.updateshow=false
            toast.success(res.data.mgs ,{timeout:1000});

          })
          .catch((error)=>{
            this.updateshow=false
            toast.error('Something was wrong!')
          })

        },

       async moduleByIdedit(id){
        console.log('edit',id)
          this.updateshow=true
          await axios.get("Module/GetModuleById/"+id)

          .then((res)=>{
            console.log('edit',res)
            this.upmoduleupdata =res.data[0]
          }).catch((error)=>{
            this.updateshow=false
            toast.error('Something was wrong!')
          })

        },

        async deletemodule(id){
          console.log('delete',id)
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

                const res = axios.delete('Module/ModuleDeleteById/'+id)
                .then((res)=>{
                  if(res.status==200){
                    Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                  }

                 } )

              }
            })
            .catch((error)=>{
            toast.error('Something was wrong!')
          })
       },
    },

    data() {
      return {

        show:false,
        updateshow:false,
        moduleData:
          {
            name: "",
            url: "",
            sortOrder:null,
            contentId: null,
            icon: "",
            groupId:'',
            parent:null,
          },
          upmoduleupdata:
          {
            name: "",
            url: "",
            sortOrder:'',
            contentId: '',
            icon: "",
            groupId:'',
            parent:'',
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
            label: "Icon",
            field: "icon",
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
  .auto-left{
    padding-right: 270px;
  }
  .success-button {
  background-color: green;
  color: white;
  }
  .action-btn{
    @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
  }
  </style>
