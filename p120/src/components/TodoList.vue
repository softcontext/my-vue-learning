<template lang="html">
  <section>
    <ul>
      <!--
        화면의 일부를 삭제하거나 정렬할 때 key 속성을 사용합니다.
        안붙여도 되긴 하지만 개발자가 붙여주면 그만큼 처리가 빨라집니다.
        key 값은 유니크한 값이면 어떤것이든 가능합니다.
       -->
      <li v-for="(todoItem, index) in todoItems" :key="todoItem" class="shadow">
        <i class="checkBtn fas fa-check" aria-hidden="true"></i>
        {{ todoItem }}
        <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
          <i class="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </li>
    </ul>
  </section>
</template>

<script lang="js">
export default {
  name: 'src-components-todo-list',
  props: [],
  created() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        this.todoItems.push(localStorage.key(i));
      }
    }
  },
  mounted() {

  },
  data() {
    return {
      todoItems: []
    }
  },
  methods: {
    removeTodo (todoItem, index) {
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index, 1);
    }
  },
  computed: {

  }
}
</script>

<style scoped>
/* scoped: 여기 설정한 CSS는 이 파일안에 template안에만 적용한다. */
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
