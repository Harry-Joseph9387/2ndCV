import React from 'react'
import {useEffect} from 'react'
import { Desktop1 } from './components/Desktop1'
import { Desktop2 } from './components/Desktop2'
import { Desktop3 } from './components/Desktop3'
import { Desktop4 } from './components/Desktop4'
import { Desktop5 } from './components/Desktop5'
import { Desktop6 } from './components/Desktop6'
import { Navbar } from './components/Navbar'
import { FixedArrow } from './components/FixedArrow'
import {Desk } from "./components/Desk"
import {DeskFinal } from "./components/DeskFinal"
import {Deskk } from "./components/Deskk"
import {Deskkk } from "./components/Deskkk"
import './App.css'
import cvThumbnail from './assets/x1.jpg';


const App = () => {
 
  return (
    <div className="app-container">
      {/* <div className="background-left"></div> */}
      <div className="background-right"> </div>
      <Navbar />
      <div className="content-wrapper">
        <Desktop1/>
        <Desktop2/>
        <Desktop3/>
        {/* <Desk/> */}
        <DeskFinal className='deskfinal'/>
        {/* <Deskk/> */}
        {/* <Deskkk/> */}

        <Desktop4/>
        <Desktop5/>
        <Desktop6/>
      </div>
      <FixedArrow />
    </div>
  )
}

export default App