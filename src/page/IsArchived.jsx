import React, { useEffect, useState } from 'react'
import { CardNotes } from '../components/CardNotes/CardNotes'
import { NavbarContainer } from '../components/Navbar/NavbarContainer'
import '../components/CardNotes/loader.css'

export const IsArchived = () => {
    const [refresh, setRefresh] = useState(false)
    const [archived, setIsArchived] = useState([])

    useEffect(() => {
        const getAllNotesArchived = async () => {
            await fetch('https://apinotesql.herokuapp.com/api/notes/archived/getArchived')
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    const { data } = result;
                    if (result.success === false) {
                    } else {
                        setIsArchived(data)

                    }

                })
        }
        getAllNotesArchived()
    }, [setIsArchived])
    console.log(archived)
    if (archived.length === 0) {

        return (
            <div className="loader"/>
        )

    }
    return (
        <>
            <NavbarContainer />
            <section className="container container-fluid">
                <div className="row" style={{ padding: 10 + "px" }}>
                    {
                        archived.map(noteArchived => (<CardNotes key={noteArchived.idNote} setRefresh={setRefresh} {...noteArchived} />))
                    }
                </div>

            </section>

        </>
    )
}
