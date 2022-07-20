import React from 'react';
import { AllNotes } from '../components/CardNotes/AllNotes';
import { NavbarContainer } from '../components/Navbar/NavbarContainer';

export const Home = () => {
    return (
        <>
        <NavbarContainer/>
        <AllNotes/>
        <h1>Home</h1>
        </>
    )
}