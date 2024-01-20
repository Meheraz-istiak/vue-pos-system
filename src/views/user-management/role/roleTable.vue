<template>
  <div>
    <Card noborder>
      <div
        class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center"
      >
        <h6> Role Table</h6>

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
        styleClass=" vgt-table bordered centered"
        :rows="roleTable"
        :pagination-options="{
          enabled: true,
          perPage: perpage,
        }"
        :search-options="{
          enabled: true,
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


          <span v-if="props.column.field == 'status'" class="block w-full">
            <span
              class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
              :class="`${
                props.row.status === 'paid'
                  ? 'text-success-500 bg-success-500'
                  : ''
              }
            ${
              props.row.status === 'due'
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
              {{ props.row.status }}
            </span>
          </span>


          <span v-if="props.column.field == 'action'">

              <button @click="showdata(props.row.id)" >
                <span class="text-xl action-btn"

                  ><Icon icon="heroicons:pencil-square"/>

                </span>
              </button>
                <button @click="deleterole(props.row.id)">
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
    </Card>
  </div>

  <template>
    <div>
        <div class="border-t-2  border-solid border-black-600">
        <Button  class="mt-1 mb-2" text="edit Role"  btnClass="btn-outline-dark btn-sm" />
       </div>
      <Modal
        title="User Role"
        label="Modal title"
        :activeModal="show"
        @close="show = false"
        themeClass="bg-primary-500"
      >
      <div class="text-base text-slate-600 dark:text-slate-300">
        <Textinput
          label="Role Name"
          type="name"
          placeholder="Type your Role Name"
          name="smallsize2"
          v-model="idRoledata.name"
        />
        <Textinput
          label="Description"
          type="Description"
          placeholder="Enter your Role Description "
          name="Description"
          v-model="idRoledata.description"
        />
      </div>
      <div class="flex items-center pt-3">
          <input checked id="checked-checkbox"
          type="checkbox"
          value=""
          v-model="idRoledata.isActive"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">

          <label
          for="checked-checkbox"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Role Status</label>
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
const toast = useToast();

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
        await axios.post("Role/RoleEditById",this.idRoledata)

        .then((res)=>{
          this.show=false
          this.fetchData();
          toast.success(res.data.mgs ,{timeout:1000});

        }

        )

      },
     async showdata(id){
        this.show=true
         await axios.get("Role/RoleGetById/"+id)
        .then((res)=>{
          this.idRoledata =res.data
        })

      },
      async deleterole(id){
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

              const res = axios.delete('Role/RoleDelete/'+id)
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
        const response = await axios.get('Role/RoleList');
        //  console.log(response)
         this.roleTable =response.data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },

  data() {
    return {
      show:false,
      roleTable:[],
      idRoledata:
        {
         name:'',
         description:'',
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
        {
          label: "Id",
          field: "id",
        },
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
          field: "status",
        },
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
.action-btn{
  @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}
</style>
