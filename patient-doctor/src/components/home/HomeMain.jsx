import React from 'react'
import HomeHero from './HomeHero'
import Services from './Services'
import Choose from './Choose'
import Symptom from './Symptom'
import UserFooter from '../footer/UserFooter'

export default function HomeMain() {
  return (
    <div>
      <HomeHero/>
      <Services/>
       <Symptom/>
      <Choose/>
     
      <UserFooter/>
    </div>
  )
}
