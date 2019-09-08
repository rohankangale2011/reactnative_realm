import React from 'react';
import {
  Button,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const TodoItem = ({data, deleteTodo, updateTodoItem}) => {
  console.log('Data here:', deleteTodo);
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{data.name}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={updateTodoItem.bind(null, true, data)}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={deleteTodo.bind(null, data)}>
          <Text>Delete</Text>
        </TouchableOpacity>
        {/* <Button style={styles.btn} title="Edit" /> */}
      </View>
    </View>
  );
};

function TodoListComponent(props) {
  // console.log('List data props:', props);
  const {data, deleteTodo, updateTodoItem} = props;
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TodoItem
            data={item}
            deleteTodo={deleteTodo}
            updateTodoItem={updateTodoItem}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ddd',
    padding: 10,
    marginTop: 5,
  },
  item: {
    fontWeight: 'bold',
    flex: 2,
  },
  btnContainer: {
    flex: 1,
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 4,
    elevation: 1,
    borderColor: '#333',
    borderRadius: 2,
  },
});

export default TodoListComponent;
