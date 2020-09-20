<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            profile Component
                        </div>
                        
                    <div class="card-tools">
                        <button class="btn btn-success" data-toggle="modal" data-target="#AddNew"><i class="fas fa-user-plus"></i>Add new</button>
                    </div>
                    </div>

                    <div class="card-body">
                  <table class="table table-hover text-nowrap" id="example1">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <th>{{user.id}}</th>
                      <th>{{user.name|upText}}</th>
                      <th>{{user.email}}</th>
                      <th> <a href="#">
                              <i class="fa fa-edit blue"></i>/
                          </a>
                          <a href="#" @click="deleteUser(user.id)">
                              <i class="fa fa-trash red" ></i>
                          </a></th>
                    </tr>
                   
                  </tbody>
                </table>
                       
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="AddNew" tabindex="-1" aria-labelledby="AddNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <form @submit.prevent="createUser" >
                <div class="modal-header">
                    <h5 class="modal-title" id="AddNewLabel">Add New</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                    <div class="modal-body">
                <div class="form-group">
                <label>Username</label>
                <input v-model="form.name" type="text" name="name"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                <has-error :form="form" field="name"></has-error>
                </div>
                    <div class="form-group">
                        <label>email</label>
                        <input v-model="form.email" type="email" name="email"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                        <has-error :form="form" field="email"></has-error>
                    </div>
                    <div class="form-group">
                        <label>password</label>
                        <input v-model="form.password" type="password" name="password"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                        <has-error :form="form" field="password"></has-error>
                    </div>

                </div>
         
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">create</button>
                </div>
                </form>
                </div>
            </div>
        </div>

    </div>
    
</template>

<script>
    export default {
        data(){
            return{
               
            users:{},
            form: new Form({
                    name: '',
                    email: '',
                    password: '',
                })
            }
        },
       
         methods: {
            deleteUser(id){
                Swal.fire({
                title: 'Are you sure?',
                text: "You Want To Delete Data",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm Delete !'
                }).then((result) => {
                if (result.isConfirmed) {
                    this.form.delete('api/user/'+id).then(()=>{
                        Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                        )
                    }).catch(()=>{
                        Swal.fire(
                        'Failed!',
                        'An Error Accoured , Please Try Again Later',
                        'warning'
                        )
                    });
                   
                }
                })
            }
             ,loadUsers(){
                 axios.get('api/user').then(({data})=>(this.users = data.data));
             },
            createUser () {
            // Submit the form via a POST request
                this.$Progress.start();
                this.form.post('api/user')
                .then(()=>{
                    Fire.$emit('AfterCreate');
                    $("#AddNew").modal("hide");
                    Toast.fire({
                        icon: 'success',
                        title: 'Data Created successfully'
                    })
                    this.$Progress.finish();
                    })
                .catch(()=>{

                    this.$Progress.finish();
                });
               
             
            }
        },
         created() {
            this.loadUsers();
            Fire.$on('AfterCreate',() => {
               this.loadUsers();
           });
        }
        
    }
</script>
