import { useState } from "react";

const SetsForm = ({ getSets, num }) => {
    
    const [rep, setRep] = useState('')
    const [weight, setWeight] = useState('')
    const [enabled, setEnabled] = useState(true)
    

    
    const handleClick = (e) => {
        e.preventDefault()
        let data = { rep, weight }
        setEnabled(false)
        getSets(data, num)
    }
    
    const handleEdit = (e) => {
        e.preventDefault()
        setEnabled(true)
    }

    return(
        <div className="sets-form">
            <form className="create-sets">
                <div className="sets-col-1">
                    <p>Set {num}: </p>
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
                    {enabled && <button className="add-set-button" onClick={handleClick}>Add Set</button>}
                    {!enabled && <button className="edit-set-button" onClick={handleEdit}>Edit Set</button>}
                </div>
            </form>
    </div>
    )
}

export default SetsForm;
