import React from 'react'
import DashBoardHero from './DashBoardHero'
import GraphCount from './GraphCount'
import ShowCount from './ShowCount'

export default function DashBoard() {
  return (
    <div>
      <DashBoardHero/>
      <GraphCount/>
      <ShowCount/>
    </div>
  )
}
