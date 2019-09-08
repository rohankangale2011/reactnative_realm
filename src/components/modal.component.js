import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';

function TodoModal({modalVisibility, selectedTodo, setUpdatedTodo}) {
  const [todo, setTodo] = useState(selectedTodo);

  useEffect(() => {
    const {name = ''} = selectedTodo;
    setTodo(name);
  }, [selectedTodo]);

  const updateTodo = text => {
    setTodo(text);
  };

  const setUpdatedTodoFn = () => {
    setUpdatedTodo(todo, selectedTodo);
  };

  return (
    <View style={{marginTop: 22}}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisibility}
        onRequestClose={setUpdatedTodoFn}>
        <View style={{padding: 20}}>
          <View>
            <TextInput
              style={styles.textInput}
              onChangeText={updateTodo}
              value={todo}
              placeholder="Check"
            />

            <TouchableHighlight style={styles.btn} onPress={setUpdatedTodoFn}>
              <Text style={styles.btnText}>Update</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    marginBottom: 4,
    elevation: 1,
    borderColor: '#333',
    borderRadius: 2,
  },
  btnText: {
    color: '#fff',
  },
});

export default TodoModal;
