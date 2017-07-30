import TODOS from '../action_types/todos'
import { defaultTodos } from '../const'
import { push } from 'react-router-redux'

export const fetchTodos = () => {
	return (dispatch, store) => {
		dispatch(fetching())
		dispatch(fetchingSucceed(defaultTodos))
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
		const filteredTodos = filterTodos(category.todos, store().todos.showDone, store().todos.filter)
		dispatch(fetchingSucceed(newItems))
		dispatch(setCurrentTodos(filteredTodos))
		dispatch(push(`/category${category.id}`))
	}
}

const filterTodos = (todos, showDone, filter) => {
	var pattern = new RegExp(`${filter.toLowerCase()}.*`)
	if (!showDone) {
		return todos.filter(item => !item.done && item.title.toLowerCase().match(pattern))
	}
	return todos.filter(item => item.title.toLowerCase().match(pattern))
}

export const setTodosFilter = (showDone, filter) => {
	return (dispatch, store) => {
		dispatch(setFilter(showDone, filter))
		const currentCategory = store().todos.todos.filter(category => category.selected)[0]
		const currentTodos = filterTodos(currentCategory.todos, showDone, filter)
		dispatch(setCurrentTodos(currentTodos))
	}
}

export const deleteCategory = (id) => {
	return (dispatch, store) => {
		var items = store().todos.todos
		const item = items.filter(item => id === item.id)[0]
		if (item.depth !== 1) {
			const parentId = item.parentId
			items = items.map(item => {
				if (item.id === parentId) {
					const newChildren = item.childrenId.filter(item => item !== id)
					return {...item, childrenId: newChildren}
				}
				return item
			})
		}
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
		const sameLevelId = parent[0].childrenId[0]
		var sameLevelVisibility = true
		if (sameLevelId !== undefined) {
			var sameLevelVisibility = items.filter(item => sameLevelId === item.id)[0].visible
		}
		const newCategory = {
				id: store().todos.currentId + 1,
				depth: parent[0].depth + 1,
				childrenId: [],
				parentId: id,
				visible: sameLevelVisibility,
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

export const changeTodoStatus = (categoryId,todoId) => {
	return (dispatch, store) => {
		const items = store().todos.todos
		const newItems = items.map(item =>{
			if (item.id === categoryId) {
				var newTodos = item.todos.map(todo => {
					if (todo.todoId === todoId) {
						return {...todo, done: !todo.done}
					}
					return todo
				})
				return {...item, todos: newTodos}
			}
			return item
		})
		dispatch(fetchingSucceed(newItems))
		const currentCategory = newItems.filter(category => category.selected)[0]
		const currentTodos = filterTodos(currentCategory.todos, store().todos.showDone, store().todos.filter)
		dispatch(setCurrentTodos(currentTodos))
	}
}

export const addTodo = (newTodo,id) => {
	return (dispatch, store) => {
		const currentTodos = store().todos.currentTodos
		dispatch(setCurrentTodos([newTodo, ...currentTodos]))
		const newItems = store().todos.todos.map(item => {
			if (item.id === id) {
				return {...item, todos: [newTodo, ...item.todos]}
			}
			return item
		})
		dispatch(fetchingSucceed(newItems))
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

export const setFilter = (showDone, filter) => ({
	type: TODOS.SET_FILTER,
	filter: filter,
	showDone: showDone
})

export const fetchingFailure = () => ({
	type: TODOS.FETCHING_REJECTED,
})

export const fetchingSucceed = (todos) => ({
	type: TODOS.FETCHING_RESOLVED,
	todos: todos,
})
