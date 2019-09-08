import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {
  realm,
  getAllTodos,
  insertTodoItem,
  deleteTodoItem,
  updateTodoItem,
} from './src/database';

import TodoAddComponent from './src/components/todoadd.component';
import TodoListComponent from './src/components/todolist.component';
import TodoModal from './src/components/modal.component';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState('');

  useEffect(() => {
    getAllTodosData();
    realm.addListener('change', () => {
      getAllTodosData();
    });
  }, []);

  function getAllTodosData() {
    getAllTodos().then(
      resp => {
        setTodos(resp);
      },
      err => {
        console.log('Error for get all:', err);
      },
    );
  }

  const onAdd = todoItem => {
    // console.log('Totodo Item:', todoItem);
    insertTodoItem(todoItem).then(
      () => {
        // console.log('Insert Response:', resp);
      },
      err => {
        console.log('Error:', err);
      },
    );
  };

  const deleteTodo = item => {
    deleteTodoItem(item).then(
      resp => {
        console.log('Delete success:', resp);
      },
      err => {
        console.log('Delete err:', err);
      },
    );
  };

  const setModalVisibilityFn = visible => {
    setModalVisibility(visible);
  };

  const updateTodoItemFn = (modalStatus, todoItem) => {
    setModalVisibility(modalStatus);
    setSelectedTodo(todoItem);
  };

  const setUpdatedTodo = async (name, todoItem) => {
    setModalVisibility(false);
    await updateTodoItem(name, todoItem);
  };

  return (
    <View style={styles.container}>
      <TodoAddComponent onAdd={onAdd} />
      <TodoListComponent
        data={todos}
        deleteTodo={deleteTodo}
        updateTodoItem={updateTodoItemFn}
      />
      <TodoModal
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibilityFn}
        selectedTodo={selectedTodo}
        setUpdatedTodo={setUpdatedTodo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
});

export default App;
