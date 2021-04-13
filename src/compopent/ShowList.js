import React from 'react'
import TodoList from "./TodoList";
export default function ShowList(props) {


  return (<>




    {
      props.data.map((item) => <TodoList key={item._id} id={item._id} title={item.title} date={item.date} data={props.data} onSelect={props.delete} />
      )

    }


  </>)
}
