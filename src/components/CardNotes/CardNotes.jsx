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
import Swal from 'sweetalert2'

export const CardNotes = ({ idNote, title, desc, categories, isArchive = true, setRefresh }) => {

    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState({});
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setValue({ idNote, title, desc });
        setIsEdit(true);
        setShow(true);
    }

    const handleDelete = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch(`https://apinotesql.herokuapp.com/api/notes/deleteNote/${idNote}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                    .then(data => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        setRefresh(true)
                    })
            }
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
        if (success) {
            Swal.fire(
                `${title} Archived!`,
                `${message}`,
                'success'
            )
            setRefresh(true)
        }else{
            Swal.fire(
                `${title} Archived!`,
                `${message}`,
                'error'
            )
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
            Swal.fire(
                'Unarchived!',
                `${message}`,
                'success'
            )
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    }

    return (
        <>
            <Card className="card">
                <Card.Body>
                    <Card.Title className="card-name">{title}</Card.Title>
                    <Card.Text className="card-desc">{desc}</Card.Text>
                    {/* categorias */}
                    <Card.Title className="card-name">Categories</Card.Title>
                    {
                        categories?.map((cat) => (
                            <p key={cat.idCategory} >{cat.nameCategory}</p>
                        ))
                    }
                    {
                        isArchive ? (<Button onClick={handleUnArchived}><RiInboxUnarchiveLine className='cart-icon' /></Button>) : (<Button onClick={handleArchive}><BiBox className='cart-icon' /></Button>)
                    }
                    <Button onClick={handleShow}><BsPencilSquare className='cart-icon' /></Button>
                    <CreateNotes show={show} setShow={setShow} isEdit={isEdit} setRefresh={setRefresh} values={value} />
                    <Button onClick={handleDelete}><AiOutlineDelete className='cart-icon' /></Button>
                </Card.Body>
            </Card>
        </>
    )
}
