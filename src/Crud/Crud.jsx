import React, { Component } from 'react'
import {user} from '../mock'
import './Crud.css'
export default class Crud extends Component {
  constructor(props) {
    super (props);
    this.state = {
      name : "",
      status : "",
      search: "",
      select: null,
      datalist : user
    }
  }
  render() {

    // delete
    const onDelete = (ids) =>{
      // console.log(id);
      let filtered = this.state.datalist.filter((value) => value.id !== ids)
      this.setState({
        datalist:filtered
      })
    }
    // create
    const onChange = (e) => {
      this.setState({[e.target.name]: e.target.value});
    }
    const onCreate = () => {
      let user ={
      id: Date.now(),
      name:this.state.name,
      status: this.state.status
    };
    this.setState({
      datalist :[user, ...this.state.datalist],
      name: '',
       status: ''
    })
    console.log(user);
    }

    // search..
    const onSearch = (e) => {
      let filtered = user .filter((value) =>`${value[this.state.search]}`.toLowerCase().includes(e.target.value.toLowerCase()));
      this.setState({
        datalist: filtered
      })
      console.log(e);
    }
    // search by cotigory
    const onSelect = (e)=>{
      // console.log(e.target.value);
      this.setState({
        search: e.target.value
      })
    }

    // update

    const onUpdate = ({id , name , status}, isSave) => {
      let updatedValue = this.state.datalist.map((value) => value.id === this.state.select?.id ?{...value , name: this.state.name , status: this.state.status} : value )
      if (isSave) {
        this.setState({
          datalist: updatedValue ,
          select: null
        })
      }else{
        this.setState({
          name: name,
          status:status,
          select:{id , name , status}
      })
      };
      console.log(id);
    }


    return (
      <div>
        <table className='container' border='1' width='60%'>
          <thead>
            <tr className='tablerow'>
              <th>id</th>
              <th>name</th>
              <th>status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.datalist.length ?
              this.state.datalist.map(({id, name, status}) => {
                return (
                  <tr className='idnumber' key={id}>
                    <td>{id}</td>
                    <td className='tablediscription'>
                      {this.state.select?.id === id ? <input  name='name' onChange={onChange} type='text' value={this.state.name}/> : name}
                    </td>
                    <td className='tablemain'>
                      {this.state.select?.id === id ? <input name='status' onChange={onChange} type='text' value={this.state.status}/> : status}
                    </td>
                    <td className='wrapperbtn'>
                      <button className='btn' onClick={() => onDelete(id)}>delete</button>
                      <button className='btn2' onClick={() => onUpdate({id, name , status} , this.state.select?.id === id)} >
                        {this.state.select?.id == id ? 'save' : 'edit'}
                      </button>
                    </td>
                  </tr>
                  
                )
              })
              :
              <tr>
                <th colSpan={4}>
                  <h1>Noo Data</h1>
                </th>
              </tr>
            }
          </tbody>
        </table>
        {/* add user inputs */}
        <br/>
        <input value={this.state.name} onChange={onChange} name='name' placeholder="enter name..."/>
        <input value={this.state.status} onChange={onChange} name='status' placeholder="enter status..." />
        <button onClick={onCreate}>add user</button>
        {/*  selectorn va search */}
        <div>
          <br/>
        <select onSelect={onSelect}>
          <option value="id">id</option>
          <option value="name">name</option>
          <option value="status">status</option>
        </select>
        <input  onChange={onSearch} placeholder='search...' />
        </div>
      </div>
      
    )
  }
}
