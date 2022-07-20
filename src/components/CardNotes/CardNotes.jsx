import React, { useState } from 'react'
import { BiBox } from 'react-icons/bi'
import { BsPencilSquare } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
import { RiInboxUnarchiveLine } from 'react-icons/ri'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './cardNotes.css'
import { CreateNotes } from '../ModalNotes/CreateNotes'

export const CardNotes = ({ idNote, title, desc, category, isArchive = true, setRefresh }) => {



    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState({});
    const [show, setShow] = useState(false);


    const handleShow = () => {
        setValue({ idNote, title, desc });
        setIsEdit(true);
        setShow(true);
    }

    const handleDelete = async () => {
        await fetch(`https://apinotesql.herokuapp.com/api/notes/deleteNote/${idNote}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setRefresh(true)
            })
    }

    const handleArchive = async () => {
        const data = await fetch(`https://apinotesql.herokuapp.com/api/notes/archived/${idNote}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const response = await data.json();
        const { success, message } = response;
        console.log(response)
        if (success) {
            setRefresh(true)
        } else {

        }
    }

    const handleUnArchived = async () => {
        const data = await fetch(`https://apinotesql.herokuapp.com/api/notes/unarchived/${idNote}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const response = await data.json();
        const { success, message } = response;
        if (success) {
            setRefresh(true)
        } else {

        }
    }

    return (
        <>

            <Card className="card">
                <Card.Body>
                    <Card.Title className="card-name">{title}</Card.Title>
                    <Card.Text className="card-desc">{desc}</Card.Text>
                    <p>{desc}</p>
                    {
                        isArchive ? (<Button onClick={handleUnArchived}><RiInboxUnarchiveLine className='cart-icon' /></Button>) : (<Button onClick={handleArchive}><BiBox className='cart-icon' /></Button>)
                    }
                    <Button onClick={handleShow}><BsPencilSquare className='cart-icon' /></Button>
                    <CreateNotes show={show} setShow={setShow} isEdit={isEdit} setRefresh={setRefresh} values={value} />
                    <Button onClick={handleDelete}><AiOutlineDelete className='cart-icon' /></Button>
                </Card.Body>
            </Card>
            {/*  <div className="card">
                <div className="tools">
                    <div className="circle">
                        <span className="red box"></span>
                    </div>
                    <div className="circle">
                        <span className="yellow box"></span>
                    </div>
                    <div className="circle">
                        <span className="green box"></span>
                    </div>
                </div>
                <div className="card__content">
                    <h2>title</h2>
                    <p>{title}</p>
                    <h2>Desciption</h2>
                    <p>{desc}</p>
                    {
                        isArchive ? (<Button onClick={handleUnArchived}><RiInboxUnarchiveLine className='cart-icon' /></Button>) : (<Button onClick={handleArchive}><BiBox className='cart-icon' /></Button>)
                    }
                    <Button onClick={handleShow}><BsPencilSquare className='cart-icon' /></Button>
                    <CreateNotes show={show} setShow={setShow} isEdit={isEdit} setRefresh={setRefresh} values={value} />
                    <Button onClick={handleDelete}><AiOutlineDelete className='cart-icon' /></Button>
                </div>
            </div> */}
        </>
    )
}
