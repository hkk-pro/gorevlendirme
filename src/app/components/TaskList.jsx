import React, { Component } from 'react'
import { connect } from 'react-redux'

export const TaskList = ({tasks,name}) => {
    console.log(tasks)
    return (
        <>
        <h3>{name}</h3>
        <div>
            {
                tasks.map((task,index)=><div key={index}>{task.name}</div>)
            }
            <hr/>
        </div>
        </>
    )
}

const mapStateToProps = (state,ownProps) => {
    let groupID=ownProps.id

    return{
        name:ownProps.name,
        id:groupID,
        tasks:state.tasks.filter(task=>task.group===groupID)
    }
    
}



export const ConnectedTaskList= connect(mapStateToProps)(TaskList)
