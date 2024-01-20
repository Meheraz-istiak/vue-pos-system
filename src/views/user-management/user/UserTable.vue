<template>
    <div>
      <Card noborder>
        <div
          class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center"
        >
          <h6> User Table</h6>

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
          :rows="advancedTable"
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
            <span v-if="props.column.field == 'customer'" class="flex">
              <span class="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
                <img
                  :src="props.row.customer.image"
                  :alt="props.row.customer.name"
                  class="object-cover w-full h-full rounded-full"
                />
              </span>
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize"
                >{{ props.row.customer.name }}</span
              >
            </span>
            <span v-if="props.column.field == 'order'">
              {{ "#" + props.row.order }}
            </span>
            <span
              v-if="props.column.field == 'date'"
              class="text-slate-500 dark:text-slate-300"
            >
              {{ props.row.date }}
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

              <button >
                <span class="text-xl action-btn"

                  ><Icon icon="heroicons:pencil-square"/>

                </span>
              </button>
                <button ><span class="text-xl action-btn"
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
  </template>
  <script>
  import Dropdown from "@/components/Dropdown";
  import Card from "@/components/Card";
  import Icon from "@/components/Icon";
  import InputGroup from "@/components/InputGroup";
  import Pagination from "@/components/Pagination";
  import { MenuItem } from "@headlessui/vue";
  import { advancedTable } from "../../../constant/basic-tablle-data";

  export default {
    components: {
      Pagination,
      InputGroup,
      Dropdown,
      Icon,
      Card,
      MenuItem,
    },

    data() {
      return {
        advancedTable,
        current: 1,
        perpage: 10,
        pageRange: 5,
        searchTerm: "",
        actions: [
          {
            name: "view",
            icon: "heroicons-outline:eye",
          },
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
            label: "Order",
            field: "order",
          },
          {
            label: "Customer",
            field: "customer",
          },
          {
            label: "Date",
            field: "date",
          },

          {
            label: "Quantity",
            field: "quantity",
          },

          {
            label: "Amount",
            field: "amount",
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
