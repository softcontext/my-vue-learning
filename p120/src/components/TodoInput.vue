<template lang="html">
  <div class="inputBox shadow">
    <input type="text" placeholder="할 일을 입력하세요"
      v-model="newTodoItem" v-on:keyup.enter="addTodo">
    <!-- <button type="button" name="button" v-on:click="addTodo">추가</button> -->
    <span class="addContainer" v-on:click="addTodo">
      <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>
  </div>
</template>

<script lang="js">
  export default  {
    name: 'src-components-todo-input',
    props: [],
    mounted() {

    },
    data() {
      return {
        newTodoItem: ''
      }
    },
    methods: {
      addTodo () {
        var value = this.newTodoItem.trim();
        if (value) {
          localStorage.setItem(value, value);
          this.clearInput();
        }
      },
      clearInput () {
        this.newTodoItem = '';
      }
    },
    computed: {

    }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: inline-block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
</style>
