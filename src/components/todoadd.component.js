import React, {useState} from 'react';
import {Button, View, TextInput, StyleSheet, ToastAndroid} from 'react-native';

function TodoAddComponent(props) {
  const [todo, setTodo] = useState('');

  const handleChange = data => {
    setTodo(data);
  };

  const addTodo = () => {
    if (todo) {
      const todoItem = {
        id: new Date().getTime(),
        name: todo,
        creationDate: new Date(),
      };
      props.onAdd(todoItem);
      setTodo('');
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Enter enter TODO item',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter todo item"
        onChangeText={handleChange}
        value={todo}
      />
      <Button color="#333" onPress={addTodo} title="Add" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
    zIndex: -1,
  },
  textInput: {
    height: 40,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default TodoAddComponent;
