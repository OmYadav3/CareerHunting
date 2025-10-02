import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const CompanyCreate = () => {
  return (
    <div>
      <Navbar/>
      <div className="max-w-4xl mx-auto">
         <h1 className='font-bold text-2xl'>Your Company Name</h1>
         <p>What would you like to give your company name? You need to change this later.</p>
         <Label>Company Name </Label>
         <Input
         type='text'
         className='my-2'
         placeholder='JobHunt, Micrsoft, etc.'
         />
      </div>
    </div>
  )
}

export default CompanyCreate
