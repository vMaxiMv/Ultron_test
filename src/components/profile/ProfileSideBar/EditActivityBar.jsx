import React, {useEffect} from 'react';
import "./EditActivityBar.css"
import {changeIdEnteryThunk, changeNoteAC, DeletIdEnteryThunk, FillActivityThunk} from "../../../redux/ProfileReducer";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import Modal from "react-modal";


const buttonBlockChangeStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const buttonChangeStyles = {
    padding: '8px 12px',
    margin: '5px',
    borderRadius: '4px',
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
};

function EditActivityBar(props) {
    const dispatch = useDispatch()
    const ChangeNote = useSelector(state=>state.Profile.ChangeNote)
    const {register, handleSubmit, reset } = useForm()


    const closeModal = () => {
        reset();
        dispatch(changeNoteAC(false))
    };
    const onSubmit = async (data)=>{
        dispatch(changeIdEnteryThunk(props.entry_id,data))
        console.log(data)
        closeModal()
    }


    return (
        <div className='Main_activity_bar'>
            <div className='activity_bar_title'><h2>Редактирование активности</h2></div>
            <div className='activity_bar_menu'>
                <ul>
                    <li><button onClick={()=>dispatch(changeNoteAC(true))}>Изменить</button></li>
                    <li><button onClick={()=>dispatch(DeletIdEnteryThunk(props.entry_id))}>Удалить</button></li>

                </ul>
            </div>
            <Modal
                isOpen={ChangeNote}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        background: 'rgba(20, 20, 20, 0.9)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        background: '#499eb4',
                        border: 'none',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        borderRadius: '8px',
                        padding: '20px',
                        color: 'white',
                        width: '25%', // Подберите подходящую ширину для вашего окна
                    },
                }}
            >
                <h3>Изменение активности</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('amount')} type="number" placeholder="Введите число" />
                    <br />
                    <input {...register('description')} type="text" placeholder="Введите текст" />
                    <br />
                    <input {...register('date_added')} type="date" />
                    <br />
                    <div style={buttonBlockChangeStyles}>
                        <button style={buttonChangeStyles} type="submit">
                            Отправить
                        </button>
                        <button style={buttonChangeStyles} type="button" onClick={closeModal}>
                            Отмена
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default EditActivityBar;