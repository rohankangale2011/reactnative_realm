import Realm from 'realm';

export const TODO_LIST_SCHEMA = 'TodoList';
export const TODO_SCHEMA = 'Todo';

export const TodoSchema = {
  name: TODO_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: {type: 'string', indexed: true},
  },
};

export const TodoListSchema = {
  name: TODO_LIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: {type: 'string', indexed: true},
    creationDate: 'date',
    todos: {type: 'list', objectType: TODO_SCHEMA},
  },
};

const databaseOptions = {
  path: 'todoList.realm',
  schema: [TodoSchema, TodoListSchema],
  schemaVersion: 1,
};

export const insertTodoItem = todoItem =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
      realm.write(() => {
        realm.create(TODO_LIST_SCHEMA, todoItem);
        resolve(todoItem);
      });
    });
  });

export const updateTodoItem = (name, todoItem) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const selectedItem = realm.objectForPrimaryKey(
            TODO_LIST_SCHEMA,
            todoItem.id,
          );
          selectedItem.name = name;
          resolve();
        });
      })
      .catch(err => {
        reject(err);
      });
  });

export const deleteTodoItem = todoItem =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const selectedItem = realm.objectForPrimaryKey(
            TODO_LIST_SCHEMA,
            todoItem.id,
          );
          realm.delete(selectedItem);
          resolve;
        });
      })
      .catch(err => {
        reject(err);
      });
  });

export const getAllTodos = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        const todoItems = realm.objects(TODO_LIST_SCHEMA);
        resolve(todoItems);
      })
      .catch(err => {
        reject(err);
      });
  });

export const deleteAllTodos = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        const todoItems = realm.objects(TODO_LIST_SCHEMA);
        realm.delete(todoItems);
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });

export const realm = new Realm(databaseOptions);
