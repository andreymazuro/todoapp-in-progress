import TODOS from '../action_types/todos'

export const fetchTodos = () => {
	return (dispatch, store) => {
		dispatch(fetching())

    const todos = [
	    {
	      id: 1,
				depth: 1,
				childrenId: [2,4],
				visible: true,
				selected: false,
	     	name: 'Work',
	      todos: ['Make coffe', 'do hard work', 'be animal'],
	    },
	    {
				id: 2,
				depth: 2,
				childrenId: [3],
				parentId: 1,
				visible: true,
				selected: false,
				name: 'Front-work',
				todos:['Laugh', 'Loose'],
			},
			{
				id: 3,
				depth:3,
				childrenId: [],
				parentId: 2,
				visible: true,
				selected: false,
				name: 'gulpy',
				todos: ['Kill', 'Boy'],
			},
	    {
				id: 4,
				depth: 2,
				childrenId: [],
				parentId: 1,
				visible: true,
				selected: false,
				name: 'do shit',
				todos:['Do money', 'earn respect']
			},
	    {
	      id: 5,
	      depth: 1,
				childrenId: [6,7],
				visible: true,
				selected: false,
	      name: 'Rest',
	      todos: ['Make stuff', 'do bad work', 'be patient']
			},
	    {
				id: 6,
				depth: 2,
				childrenId: [],
				parentId: 5,
				visible: true,
				selected: false,
				name: 'Relax',
				todos:['Fury', 'Rage']
			},
	    {
				id: 7,
				depth: 2,
				childrenId: [],
				parentId: 5,
				visible: true,
				selected: false,
				name: 'Do stuff',
				todos:['Like me', 'earn pain'],
	    },
	  ]

		dispatch(fetchingSucceed(todos))
	}
}

export const selectCategory = (category) =>{
	return (dispatch, store) => {
		const items = store().todos.todos
		const newItems = items.map(item => {
			if (item.id === category.id) {
				return {...item, selected: true}
			}
			return {...item, selected: false}
		})
		dispatch(fetchingSucceed(newItems))
		dispatch(setCurrentTodos(category.todos))
	}
}

export const deleteCategory = (id) => {
	return (dispatch, store) => {
		const items = store().todos.todos
		const newItems = deleteById(items,[id])
		const selectedCategory = items.filter(item => item.selected === true)[0] || {}
		if (newItems.filter(item => item.id === selectedCategory.id).length === 0) {
			dispatch(setCurrentTodos([]))
		}
		dispatch(fetchingSucceed(newItems))
	}
}

export const editCategoryName = (id, newName) => {
	return (dispatch, store) => {
		const items = store().todos.todos
		const newItems = items.map(item => {
			if (item.id === id) {
				return {...item, name: newName}
			}
			return item
		})
		dispatch(fetchingSucceed(newItems))
	}
}

export const addNestedCategory = (id, name) => {
	return (dispatch, store) => {
		const items = store().todos.todos
		const newItems = items.map(item => {
			if (item.id === id) {
				return {...item, childrenId: [store().todos.currentId + 1, ...item.childrenId] }
			}
			return item
		})
		const parent = items.filter(item => id === item.id)
		const newCategory = {
				id: store().todos.currentId + 1,
				depth: parent[0].depth + 1,
				childrenId: [],
				parentId: id,
				visible: true,
				name: name,
				todos: []
		}
		dispatch(addingNestedCategory([...newItems, newCategory]))
	}
}

export const hideCategory = (category, action) => {
	return (dispatch, store) => {
		var items = store().todos.todos
		const childrenId = category.childrenId
		var newItems = hide(childrenId, items, action)
		dispatch(fetchingSucceed(newItems))
	}
}

const hide = (childrenId, items, action) => {
	let children = []
	const show = action === 'show'
	var newItems = items.map(item => {
		if (childrenId.indexOf(item.id) !== -1) {
			if (item.childrenId.length !== 0) {
				children = [...children, ...item.childrenId]
				return {...item, visible: show}
			} else {
				return {...item, visible: show}
			}
		}
		return item
	})
	if (children.length !== 0) {
		return hide(children, newItems, action)
	} else {
		return newItems
	}
}

const deleteById = (items,ids) => {
	let children = []
	var newItems = items.map(item => {
		if (ids.indexOf(item.id) !== -1) {
			if (item.childrenId.length !== 0) {
				children = [...children, ...item.childrenId]
				return null
			}
			return null
		}
		return item
	})
	var newS = newItems.filter(item => item !== null)
	if (children.length !== 0) {
		return deleteById(newS, children)
	} else {
		return newS
	}
}

export const addingNestedCategory = (todos) => ({
	type: TODOS.ADDING_NESTED_CATEGORY,
	todos: todos,
})

export const fetching = () => ({
	type: TODOS.FETCHING,
})

export const setCurrentTodos = (currentTodos) => ({
	type: TODOS.SET_CURRENT_TODOS,
	currentTodos: currentTodos
})

export const addCategory = (categoryInfo) => ({
	type: TODOS.ADD_CATEGORY,
	categoryInfo: categoryInfo
})

export const fetchingFailure = () => ({
	type: TODOS.FETCHING_REJECTED,
})

export const fetchingSucceed = (todos) => ({
	type: TODOS.FETCHING_RESOLVED,
	todos: todos,
})
