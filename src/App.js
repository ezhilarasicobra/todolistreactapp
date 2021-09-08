import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todolist, setTodolist] = useState([]);
  const [task, setTask] = useState("");
  let fetchdata = async () => {
    try {
      const todolistdata = await axios.get("http://localhost:3000/products");
      setTodolist([...todolistdata.data]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(todolist)
  useEffect(() => {
    fetchdata();
  }, []);
  let handlecreatetask = async () => {
    try {
      let postdata = await axios.post("http://localhost:3000/createtask", {
        tasks: task,
      });
      fetchdata();
      setTask("");
    } catch (error) {
      alert(error);
    }
  };
  let Handlechange = async(e,id) => {
    try {
     let updatedata= await axios.put(`http://localhost:3000/updatetask/${id}`,{status:e.target.checked})
     fetchdata();

    } catch (error) {
      alert(error)
    }
  };
let handledelete=async (id)=>{
try {
  let postdeletedata=await axios.delete(`http://localhost:3000/deletetask/${id}`)
fetchdata();
} catch (error) {
  alert(error)
}
}
  return (
    <div className="container">
      <div className="row">
        <h1>TO DO LIST</h1>
        <div className="col-lg-12">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Add your list"
              value={task}
              onChange={(e) => {
                setTask(e.target.value)}}
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={handlecreatetask}
              >
                Add your list
              </button>
            </div>
          </div>
          <div class="well" style={{ maxheight: "300px", overflow: "auto" }}>
            <ul class="list-group">
              {todolist.map((item) => {
                return (
                  <li class="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      checked={item.status}
                      value=""
                    aria-label="..."
                      onChange={(e) => {
                        Handlechange(e,item._id);
                      }}/>
                     
                   <span style={{textDecoration:item.status?"line-through":""}}> {item.tasks}</span>
                   <button className="btn-danger" style={{marginLeft: "14px"}}
                   onClick={()=>{
                    handledelete(item._id)
                   }}>X</button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
