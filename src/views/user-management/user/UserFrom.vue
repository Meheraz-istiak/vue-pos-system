<template>
    <div>
      <div class="border-t-2  border-solid border-black-600">
        <Button  class="mt-1 mb-2" text="Add User"  btnClass="btn-outline-dark btn-sm" @click="toggleModal" />
       </div>
      <Modal
        title="User Form"
        label="Modal title"
        :activeModal="show"
        @close="show = false"
        themeClass="bg-primary-500"
      >
      <div class="flex flex-wrap -mx-3 mb-6 text-base text-slate-600 dark:text-slate-300">
        <Textinput
          class="w-full md:w-1/2 px-3"
          label="UserName"
          type="UserName"
          placeholder="Type your UserName"
          name="UserName"
          v-model="userData.userName"
        />
        <Textinput
          class="w-full md:w-1/2 px-3"
          label="FirstName"
          type="FirstName"
          placeholder="Type your FirstName"
          name="FirstName"
          v-model="userData.firstName"
        />
        <Textinput
          class="w-full md:w-1/2 px-3"
          label="LastName"
          type="LastName"
          placeholder="Type your LastName"
          name="LastName"
          v-model="userData.lastName"
        />
        <Textinput
          class="w-full md:w-1/2 px-3"
          label="Email"
          type="email"
          placeholder="Type your Email"
          name="Email"
          v-model="userData.email"
        />

        <Textinput
          class="w-full md:w-1/2 px-3"
          label="Mobile"
          type="number"
          placeholder="Type your Mobile"
          name="Mobile"
          v-model="userData.mobile"
        />
        <Textinput
          class="w-full md:w-1/2 px-3"
          label="NationalID"
          type="number"
          placeholder="Type your NationalID"
          name="NationalID"
          v-model="userData.nationalID"
        />


        <div class="w-full md:w-1/2 px-3">
          <Select
          label="Role"
          placeholder="Enter your Role"
          v-model="userData.role"
          >
            <option v-for="role in options" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </Select>
        </div>

        <Textinput
          class="w-full md:w-1/2 px-3"
          label="Password"
          type="Password"
          placeholder="Enter your Password "
          name="Password"
          v-model="userData.password"
        />

      </div>
      <template v-slot:footer>
        <Button
          text="Close"
          btnClass="btn-primary px-4 py-1"
          @click="toggleModal"
        />
        <Button
          text="Login"
          btnClass="btn-dark px-4 py-1"
          @click="submitData"
        />
      </template>
        <h2 :activeModal="edit" >edit</h2>
        <button @click="editModal">edit</button>
      </Modal>
      <div>
        <table/>
      </div>
    </div>
  </template>
  <script setup>
  import Modal from "@/components/Modal";
  import Button from "@/components/Button";
  import Textinput from "@/components/Textinput";
  import Select from "@/components/Select";
  import { ref } from "vue";
  const edit = ref(false);

  const show = ref(false);

  const editModal = () => {
    show.value = !show.value;
  };

  const toggleModal = () => {
    show.value = !show.value;
  };

  let  options = [
        {
          name: "Hr",
          label: "Option 1",
          id:'1'
        },
        {
          name: "admin",
          label: "Option 2",
          id:'2'
        },
        {
          name: "head",
          label: "Option 3",
          id:'3'
        },
      ]

  const userData = ref({
       userName:'',
       firstName:'',
       lastName:'',
       email:'',
       mobile:'',
       nationalID:'',
       role:'',
       password:''


  })

  const submitData = () => {
  // You can replace this with an actual API call to your backend to insert the data
  console.log('Submitting data:', userData.value);
  // Reset the form after submission
  userData.value = {
       userName:'',
       firstName:'',
       lastName:'',
       email:'',
       mobile:'',
       nationalID:'',
       role:'',
       password:'',
  };
};
  </script>
