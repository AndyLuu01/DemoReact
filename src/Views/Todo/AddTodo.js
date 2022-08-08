import React from "react";
import { toast } from 'react-toastify';

class AddTodo extends React.Component {

    state = {
        title: ''
    }

    HandleOnChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    HandleOnClick = () => {
        if (!this.state.title) {
            toast.info("Error!");
            return;
        }
        let todo = {
            id: Math.floor(Math.random() * 1001),
            title: this.state.title
        }
        console.log(todo);
        this.props.AddNewTodo(todo);
        this.setState({
            title: ''
        })
    }

    render() {
        let { title } = this.state;
        return (
            <div className="add-todo">
                <input type="text" value={title}
                    onChange={(event) => this.HandleOnChange(event)}
                />
                <button className="add"
                    onClick={() => this.HandleOnClick()}
                >Add</button>
            </div>
        )
    }
}

export default AddTodo;