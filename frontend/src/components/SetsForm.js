import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus} from '@fortawesome/free-solid-svg-icons';

const SetsForm = ({ getSets, num }) => {
    
    const [rep, setRep] = useState('')
    const [weight, setWeight] = useState('')
    const [enabled, setEnabled] = useState(true)
    

    //Handles click of addset button

    const handleClick = (e) => {
        e.preventDefault()
        let data = { rep, weight }
        setEnabled(false)
        getSets(data, num)
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
                        type="number"
                        onChange={(e) => {
                            setRep(e.target.value)     
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
                        type="number"
                        onChange={(e) => setWeight(e.target.value)}
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

export default SetsForm;
