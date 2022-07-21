import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { SelectCategory } from '../SelectCategory/SelectCategory';
import { CardNotes } from './CardNotes';
import './loader.css'

export const AllNotes = () => {

    const [notes, setNotes] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [filter,setFilter] = useState('');

    const [formValues, handleInputChange, reset, setValues] = useForm({
        category: ""
    });

    const { category } = formValues;

    useEffect(() => {
        const getAllNotes = async () => {
            /* https://apinotesql.herokuapp.com/api/notes/ */

            await fetch('https://apinotesql.herokuapp.com/api/notes/')
                .then(res => res.json())
                .then(result => {
                    
                    const { data } = result;
                    setNotes(data)
                    setRefresh(false)
                })
        }
        getAllNotes()
    }, [refresh, setRefresh, setNotes]);

    const handleFilterCategory=async(idNote)=>{
        await fetch(`https://apinotesql.herokuapp.com/api/notes/categories/filter/${idNote}`)
        .then(res => res.json())
        .then(result => {
            

            const { success,data } = result;
            if (!data) {
                setRefresh(false)
            }else{
                const {notes,nameCategory} = data;
                setFilter(nameCategory)
                setNotes(notes)
            }
        })
    }
   

    if (notes.length === 0) {

        return (
            <div className="loader" />
        )
    }
    return (
        <>
            <section className="container container-fluid">
                <SelectCategory handleInputChange={handleInputChange} category={category} handleFilterCategory={handleFilterCategory} isFilter={true}/>
                <div className="row" style={{ padding: 10 + "px" }}>
                    {
                        notes.map(note => (
                            <CardNotes key={note.idNote} setRefresh={setRefresh} isArchive={false} {...note} />
                        ))
                    }
                </div>
            </section>

        </>
    )
}
