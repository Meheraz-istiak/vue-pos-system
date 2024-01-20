  <template>
    <div>
        <div class="border-t-2  border-solid border-black-600">
        <Button  class="mt-1 mb-2" text="Add Role"  btnClass="btn-outline-dark btn-sm" @click="toggleModal" />
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
          placeholder="Type Your Role Name"
          name="smallsize2"
          v-model="roleData.name"

        />
        <Textinput
          label="Description"
          type="Description"
          placeholder="Enter Your Role Description "
          name="Description"
          v-model="roleData.description"

        />
      </div>

      <template v-slot:footer>
        <Button
          text="Close"
          btnClass="btn-primary px-4 py-1"
          @click="toggleModal"
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
  <script setup>
  import Modal from "@/components/Modal";
  import Button from "@/components/Button";
  import Textinput from "@/components/Textinput";
  import { ref } from "vue";
  import axios from "@/http/axios";
  import { useToast } from "vue-toastification";
  const toast = useToast();
  const show = ref(false);

  const toggleModal = () => {
    show.value = !show.value;
  };

  const roleData = ref({
       name:'',
       description:''
  })

  const submitData = async () => {
  // You can replace this with an actual API call to your backend to insert the data
   let res = await  axios.post("Role/RoleInsert" ,roleData.value)
   var data1 = res.data;
   show.value =false
  //  console.log(data1.mgs)
   toast.success(data1.mgs ,{timeout:1000});
          //  location.reload();
  // console.log('Submitting data:', roleData.value);
  // Reset the form after submission
  roleData.value = {
    name:'',
    description:''
  };
};
  </script>



