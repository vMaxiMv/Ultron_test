import React from 'react';
import "./EditActivityBar.css"
import {changeNoteAC, DeletIdEnteryThunk} from "../../../redux/ProfileReducer";
import {useDispatch} from "react-redux";

import EditNote from "./EditNote";




function EditActivityBar(props) {
    const dispatch = useDispatch()

    return (
        <div className='Main_activity_bar'>
            <div className='activity_bar_title'><h2>Редактирование активности</h2></div>
            <div className='activity_bar_menu'>
                <ul>
                    <li><button onClick={()=>dispatch(changeNoteAC(true))}>Изменить</button></li>
                    <li><button onClick={()=>dispatch(DeletIdEnteryThunk(props.entry_id))}>Удалить</button></li>

                </ul>
            </div>
           <EditNote entry_id={props.entry_id}/>
        </div>
    );
}

export default EditActivityBar;