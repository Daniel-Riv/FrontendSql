import React, { useEffect, useState } from 'react'
import { CardNotes } from './CardNotes';

export const AllNotes = () => {
    const [notes, setNotes] = useState([])
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        const getAllNotes = async () => {
            await fetch('https://apinotesql.herokuapp.com/api/notes/')
            .then(res => res.json())
            .then(result => {
                console.log(result)
                const { data } = result;
                setNotes(data)
            })
        }
        getAllNotes()
    },[refresh]);
    console.log(notes)
    if(notes.length === 0) {
        
        return(
            <h1>Loading</h1>
        ) 
    }
  return (
    <>
    <section className="container container-fluid">
    <div className="row" style={{padding: 10 +"px"}}>
    {
        notes.map(note =>(
            <CardNotes key={note.idNote} setRefresh={setRefresh} isArchive={false}{...note}/>
        ))
    }
    </div>
    </section>
  
    </>
  )
}
