import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
class App extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            isDisplayFozrm: false,
        }
    }
    // Được gọi khi component được gán vào
    componentWillMount() {
        if(localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks,
            });
        }
    }

    // onGenerateData = () => {
    //     var tasks = [
    //         {
    //             id: this.generRateId(),
    //             name: 'Learn Php Basic',
    //             status: true
    //         },
    //         {
    //             id: this.generRateId(),
    //             name: 'Learn Larvel Framework',
    //             status: true
    //         },
    //         {
    //             id: this.generRateId(),
    //             name: 'Learn React js',
    //             status: false
    //         }
    //     ];
    //     this.setState ({
    //         tasks: tasks,
    //     });
    //     localStorage.setItem('tasks', JSON.stringify(tasks));
    // }

    s4() {
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    generRateId() {
        return this.s4() + this.s4() + '-' + this.s4() + '+' + this.s4() + '+' + this.s4() + '+' + this.s4() + '+' + this.s4() + '+' + this.s4();
    }

    onOpenForm = (event) => {
        this.setState({
            isDisplayForm : !this.state.isDisplayForm,
        });
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm : false,
        });
    }

    onSubmit = (data) => {
        var { tasks } = this.state;
        data.id = this.generRateId();
        tasks.push(data);
        this.setState({
            tasks: tasks,
        });       
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status ;
            this.setState({
                tasks: tasks,
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        
    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = '';
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== 1) {
            tasks.splice(index);
            this.setState({
                tasks: tasks,
            });
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    render() {
        var { tasks,isDisplayForm } = this.state;
        var elmTaskForm = isDisplayForm === true ? <TaskForm onSubmit= { this.onSubmit } onCloseForm= {this.onCloseForm }/> : '';

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản lý công việc</h1><hr/>
                </div>
                <div className="row">
                    <div className={ isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                        {/*Form*/}
                        { elmTaskForm }
                    </div>                   
                    <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button type="button" className="btn btn-primary" onClick={ this.onOpenForm }><span className="fa fa-plus mr-5"></span>Thêm công việc</button>&nbsp;
                        {/* <button type="button" className="btn btn-danger" onClick={ this.onGenerateData }>Generate Data</button> */}
                        <br/>
                        <br/>
                        {/* Search - Sort */}
                            <Control />
                        <div className="row mt-15">
                            <TaskList tasks= { tasks } onUpdateStatus={ this.onUpdateStatus } onDelete= {this.onDelete }/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
