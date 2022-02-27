import { useContext } from 'react'
import { PatientsContext } from '../context/PatiensProvider'

export const usePatients = () => {
    return useContext(PatientsContext)
}