import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus} from '@fortawesome/free-solid-svg-icons';

const EditSets = ({ getEditSets, currSets, num }) => {
    
    const [rep, setRep] = useState('')
    const [weight, setWeight] = useState('')
    const [enabled, setEnabled] = useState(true)
    const [repChange, setRepChange] = useState(false)
    const [weightChange, setWeightChange] = useState(false)


    //Handles click of addset button
    const handleClick = (e) => {
        e.preventDefault()
        if(!repChange){
            setRep(currSets[num].rep)
        }
        if(!weightChange){
            setWeight(currSets[num].weight)
        }
        let data = { rep, weight }
        setEnabled(false)
        getEditSets(data, num)
    }
    //handle click of edit set button
    const handleEdit = (e) => {
        e.preventDefault()
        setEnabled(true)
    }

    return(
        <div className="sets-form">
            <form className="create-sets">
                <div className="sets-col-1">
                    <p>Set {num+1}: </p>
                </div>
                <div className="sets-col-2">
                    <label>Reps for exercise: </label>
                    {enabled && <input
                        placeholder={currSets[num].rep}
                        type="number"
                        onChange={(e) => {
                            setRep(e.target.value)     
                            setRepChange(true)
                        }}
                        value={rep}
                    />}
                    {!enabled && <input
                        disabled
                        type="number"
                        onChange={(e) => {
                            setRep(e.target.value)     
                        }}
                        value={rep}
                    />}
                </div>
            
                <div className="sets-col-3">
                    <label>Weight for exercise: </label>
                    {enabled && <input
                        placeholder={currSets[num].weight}
                        type="number"
                        onChange={(e) => {
                            setWeight(e.target.value)
                            setWeightChange(true)
                        }}
                        value={weight}
                    />}
                    {!enabled && <input
                        disabled
                        type="number"
                        onChange={(e) => setWeight(e.target.value)}
                        value={weight}
                    />}
                </div>
                <div className="sets-col-4">
                    {enabled && <button className="add-set-button" onClick={handleClick}><FontAwesomeIcon icon={faPlus}/><span className="text-from-icon">Add Set</span></button>}
                    {!enabled && <button className="edit-set-button" onClick={handleEdit}><FontAwesomeIcon icon={faPencil}/><span className="text-from-icon">Edit Set</span></button>}
                </div>
            </form>
    </div>
    )
}

export default EditSets;
