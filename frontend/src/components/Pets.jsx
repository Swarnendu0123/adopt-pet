import React, { useState, useEffect } from 'react'
import PetItem from './PetItem'
const Pets = ({pets}) => {

  return (
    <div className="items">
    {
      pets.map((pet, index) => {
        return <PetItem key={index} pet={pet} />;
      })
    }
  </div>
  )
}

export default Pets