import axios from 'axios'
import React,{useReducer,useEffect} from 'react'

const initialState={
    loading:true,
    error:'',
    subjects:[]
}
 
const reducer=(state,action)=>{

    switch(action.type){
        case "FETCH_SUCCESS":
            return {
                loading:false,
                error:'',
                subjects:action.payload,
            }
        case "TETCH_ERROR":
            return {
                loading:false,
                error:'error',
                subjects:[]
            }

        default:
            return state
    }
}
const UserSubject = ({user_id}) => {

    const [state,dispatch]=useReducer(reducer,initialState)

    useEffect(()=>{

        axios.get(`http://localhost:3001/student/${user_id}/subjects`)
        .then(res=>{
            dispatch({type:'FETCH_SUCCESS',payload:res.data})
        })
        .catch(err=>{
            console.log(err);
            dispatch({type:"TETCH_ERROR"})
        })
    },[])
  return (

    <div>
        <h2 className="mt-5 mb-3">Enrolled Subjects</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Pass Mark</th>
            <th>Mark Obtained</th>
          </tr>
        </thead>
        <tbody>
          {state.loading ? <tr><td>'loading'</td></tr>:
          state.subjects.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.subject_name}</td>
              <td>{subject.new_pass_mark}</td>
              <td>{subject.student_mark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserSubject