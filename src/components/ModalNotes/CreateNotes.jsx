import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

import './createNotes.css';
import { useForm } from '../../hooks/useForm';
import { SelectCategory } from '../SelectCategory/SelectCategory';

export const CreateNotes = ({ show, setShow, isEdit = false, values, setRefresh }) => {

    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [numbers, setNumbers] = useState([]);

    const [formValues, handleInputChange, reset, setValues] = useForm({
        title: "",
        desc: "",
        category: ""
    });

    const { title, desc, category } = formValues;

    useEffect(() => {
        if (isEdit) {
            setValues({ title: values.title, desc: values.desc })
        }
    }, [isEdit])

    useEffect(() => {
        if (numbers.length >= 0) {
            if (category === '') {
            }else {
                handleAddCategory(parseInt(category))
            }
        }
    }, [category])

    const handleClose = () => setShow(false);

    const handleSubmit = async () => {
        /* https://apinotesql.herokuapp.com/api/notes/createNote */
        await fetch('https://apinotesql.herokuapp.com/api/notes/createNote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                desc: desc,
                category: numbers
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
                    setNumbers([]);
                    reset();
                    handleClose();
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
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

    const handleAddCategory = (idCategory) => {
        if (!numbers?.includes(idCategory)) {
            setNumbers([...numbers, idCategory])
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
                            <Form.Control type="text" className='input' placeholder="Title" name="title" value={title} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label >Description:</Form.Label>
                            <Form.Control type="text" className='input' placeholder="Content" name="desc" value={desc} onChange={handleInputChange} />
                        </Form.Group>
                        <SelectCategory handleInputChange={handleInputChange} category={category} />
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