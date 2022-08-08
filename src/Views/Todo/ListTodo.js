import React from 'react';
import AddTodo from './AddTodo';
import './ListTodo.scss'
import { toast } from 'react-toastify';

class ListTodo extends React.Component {
    state = {
        ListTodos: [
            { id: 'todo1', title: 'doing homework' },
            { id: 'todo2', title: 'Playing guitar' },
            { id: 'todo3', title: 'Listen to Music' },
            { id: 'todo4', title: 'Play football' }
        ],
        editTodo: {}
    }

    // Arrow function to addSth
    AddNewTodo = (todo) => {
        this.setState({
            ListTodos: [...this.state.ListTodos, todo]
        })
        toast.success("Wow so easy!");

    }
    // Arrow function to Delete
    HandleDeleteTodo = (todo) => {
        console.log("check delete: ", todo)
        let ListCurrent = this.state.ListTodos;
        ListCurrent = ListCurrent.filter(item => item.id !== todo.id)
        this.setState({
            ListTodos: ListCurrent
        })
        toast.success("Delete Success!")

    }
    // Arrow function to Update
    HandleEditTodo = (todo) => {
        let { editTodo, ListTodos } = this.state;
        let isEmpty = Object.keys(editTodo).length === 0;
        // save
        if (isEmpty === false && editTodo.id === todo.id) {

            let ListTodosCp = [...ListTodos];
            let objIndex = ListTodosCp.findIndex((item => item.id === todo.id));

            //Update Titile .
            ListTodosCp[objIndex].title = editTodo.title;

            this.setState({
                ListTodos: ListTodosCp,
                editTodo: ''
            })
            toast.success("update Success")
            return;
        }

        // edit
        this.setState({
            editTodo: todo
        })
    }

    handleChangeEdit = (event) => {
        let EditTodoCp = { ...this.state.editTodo };
        EditTodoCp.title = event.target.value;
        this.setState({
            editTodo: EditTodoCp
        })
    }

    render() {
        let { ListTodos, editTodo } = this.state;
        let isEmpty = Object.keys(editTodo).length === 0;
        console.log("check empty: ", isEmpty);
        return (
            < div className="list-todo-container">
                <AddTodo
                    AddNewTodo={this.AddNewTodo}
                />

                {ListTodos && ListTodos.length > 0 &&
                    ListTodos.map((item, index) => {
                        return (
                            <div className="list-todo-content" key={item.id}>
                                <div className="todo-child" key={item.id}>
                                    {isEmpty === true ?
                                        <span>{index + 1}-{item.title}</span>
                                        :
                                        <>
                                            {editTodo.id === item.id ?
                                                <span>
                                                    {index + 1} <input
                                                        value={editTodo.title}
                                                        onChange={(event) => this.handleChangeEdit(event)}
                                                    ></input>
                                                </span>
                                                :
                                                <span>{index + 1}-{item.title}</span>
                                            }
                                        </>
                                    }
                                    <button className="edit"
                                        onClick={() => this.HandleEditTodo(item)}
                                    >
                                        {isEmpty === false && editTodo.id === item.id
                                            ?
                                            'save' : 'edit'
                                        }
                                    </button>
                                    <button className="delete"
                                        onClick={() => this.HandleDeleteTodo(item)}
                                    >Delete</button>


                                </div>
                            </div>
                        )

                    })
                }

            </div >

        )
    }
}

export default ListTodo;