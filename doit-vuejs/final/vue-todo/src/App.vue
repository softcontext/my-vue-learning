<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <!--
      부모 컴포넌트인 App 컴포넌트가 데이터를 갖고 있다가
      데이터가 필요한 자식 컴포넌트에게 propsdata 라는 키값으로
      todoItems 가 보유한 배열을 전달합니다.
    -->
    <TodoList v-bind:propsdata="todoItems"
      @removeTodo="removeTodo"></TodoList>
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  data() {
    return {
      todoItems: []
    }
  },
  methods: {
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
		addTodo(todoItem) {
			localStorage.setItem(todoItem, todoItem);
			this.todoItems.push(todoItem);
		},
    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index, 1);
    }
  },
  created() {
		if (localStorage.length > 0) {
			for (var i = 0; i < localStorage.length; i++) {
				this.todoItems.push(localStorage.key(i));
			}
		}
  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
  }
}
</script>

<style>
  body {
    text-align: center;
    background-color: #F6F6F8;
  }
  input {
    border-style: groove;
    width: 200px;
  }
  button {
    border-style: groove;
  }
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
  }
</style>
