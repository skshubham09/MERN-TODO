import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo, delandAdd } from "./utils/HandleApi";
import ReactDragListView from 'react-drag-listview/lib/index.js';


function App() {

  const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")
  const [dat,setDat]=useState(toDo)
const[toDoData,setToDoData]=useState(toDo)

  useEffect(()=>{
    getAllToDo(setToDo);
  },[])
   
  

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }


  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
    console.log(fromIndex,toIndex,'in')
      const data = toDo;
      const item = data.splice(fromIndex, 1)[0];
      data.splice(toIndex, 0, item);
      setToDo(data);
      delandAdd(data);
      setText((prev)=>prev+" ")
      console.log(toDo);
    },
    nodeSelector: 'li',
    handleSelector: 'a'
  };


  return (
    <div className="App">

      <div className="container">

        <h1>ToDo App</h1>


        <div className="top">
          <input
            type="text"
            placeholder="Add To Dos..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />

          <div
            className="add"
            onClick={isUpdating ?
              () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
              : () => addToDo(text, setText, setToDo)}>
            {isUpdating ? "Update" : "Add"}
          </div>

        </div>


        
          <div className="list">

       

<ReactDragListView {...dragProps}>
            <ol>
              {toDo.length!==0 &&  toDo.map((item, index) => (
                <li key={index}>
                <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo)}
            />
                  <a className="drag">Start Drag</a>
                </li>
            ))}
            </ol>
          </ReactDragListView>




          </div>

        


      </div>

    </div>
  );
              }


export default App;
