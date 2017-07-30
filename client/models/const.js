export const defaultTodos = [
  {
    id: 1,
    depth: 1,
    childrenId: [2,4],
    visible: true,
    selected: false,
    name: 'Work',
    todos: [
      {
        title: 'Make coffe',
        text: 'Do it man',
        done: true,
        todoId: 1,
      },
      {
        title: 'Do hard work',
        text: 'Make some exscercises',
        done: true,
        todoId: 2,
      },
    ]
  },
  {
    id: 2,
    depth: 2,
    childrenId: [3],
    parentId: 1,
    visible: true,
    selected: false,
    name: 'Front-work',
    todos: [
      {
        title: 'Univer',
        text: 'Go to the university',
        done: false,
        todoId: 1,
      },
      {
        title: 'Shkola',
        text: 'Go to school',
        done: true,
        todoId: 2,
      },
    ]
  },
  {
    id: 3,
    depth:3,
    childrenId: [],
    parentId: 2,
    visible: true,
    selected: false,
    name: 'gulpy',
    todos: [
      {
        title: 'Be cool',
        text: 'Do it man',
        done: true,
        todoId: 1,
      },
      {
        title: 'Create space',
        text: 'Do it ypung fella',
        done: true,
        todoId: 2,
      },
      {
        title: 'Do hard work',
        text: 'Make some exscercises',
        done: true,
        todoId: 3,
      },
    ]
  },
  {
    id: 4,
    depth: 2,
    childrenId: [],
    parentId: 1,
    visible: true,
    selected: false,
    name: 'housework',
    todos: [
      {
        title: 'Clean',
        text: 'Clean floor nad kitchen',
        done: false,
        todoId: 1,
      },
      {
        title: 'Make better',
        text: 'Make more comfortable',
        done: true,
        todoId: 2,
      },
    ]
  },
  {
    id: 5,
    depth: 1,
    childrenId: [6,7],
    visible: true,
    selected: false,
    name: 'Rest',
    todos: [
      {
        title: 'Make value',
        text: 'Do your best',
        done: true,
        todoId: 1,
      },
      {
        title: 'Be crazy',
        text: 'Like your dog',
        done: true,
        todoId: 2,
      },
    ]
  },
  {
    id: 6,
    depth: 2,
    childrenId: [],
    parentId: 5,
    visible: true,
    selected: false,
    name: 'Feed animals',
    todos: [
      {
        title: 'Feed dog',
        text: `don't forget to buy food`,
        done: true,
        todoId: 1,
      },
      {
        title: 'Feed cat',
        text: 'He is so fat',
        done: true,
        todoId: 2,
      },
    ]
  },
  {
    id: 7,
    depth: 2,
    childrenId: [],
    parentId: 5,
    visible: true,
    selected: false,
    name: 'Do stuff',
    todos: [
      {
        title: 'Make coffe',
        text: 'Do it man',
        done: false,
        todoId: 1,
      },
      {
        title: 'Do hard work',
        text: 'Make some exscercises',
        done: true,
        todoId: 2
      },
    ]
  },
]
