import React, { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './createNotes.css';
import Swal from 'sweetalert2';


export const CreateNotes = ({ show, setShow, isEdit = false, values, setRefresh }) => {

    const handleClose = () => setShow(false);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false)
    const [formValues, handleInputChange, reset, setValues] = useForm({
        title: "",
        desc: "",
    });

    useEffect(() => {
        if (isEdit) {
            setValues({ title: values.title, desc: values.desc })
        }


    }, [isEdit])

    const { title, desc } = formValues;
    const handleSubmit = async () => {
        const data = await fetch('https://apinotesql.herokuapp.com/api/notes/createNote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                desc: desc,
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                const { success, message } = data;
                if (success === false) {
                    setError(data.error)
                    setShowError(true)
                } else {
                    Swal.fire(
                        'Success!',
                        `${message}`,
                        'success'
                    )
                    location.reload();
                    handleClose();
                }
            })
       

    }

    const handleEdit = async () => {
        if (title !== "" || desc !== "") {
            await fetch(`https://apinotesql.herokuapp.com/api/notes/updateNote/${values.idNote}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    desc: desc,
                })
            }).then(res => res.json())
                .then(data => {
                    const { success, message } = data;
                    if (success === false) {
                        setError(data.error)
                        setShowError(true)
                    } else {
                        Swal.fire(
                            'Success!',
                            `${message}`,
                            'success'
                        )
                        setRefresh(true)
                        handleClose();
                    }
                })
        }
    }

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" className='input' placeholder=" " name="title" value={title} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label >Description:</Form.Label>
                            <Form.Control type="text" className='input' placeholder=" " name="desc" value={desc} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn' onClick={handleClose}>
                        Close
                    </Button>
                    {
                        isEdit ? (<Button onClick={handleEdit}>Edit</Button>) : (<Button onClick={handleSubmit}>Save</Button>)
                    }

                </Modal.Footer>
            </Modal>
        </>
    )
}