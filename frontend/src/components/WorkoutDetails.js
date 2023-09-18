

//Need to make separate page for workout details similar to blogs 
const WorkoutDetails = ({ workout }) => {
    const {day, title, exercise} = workout
    let sets = exercise.map(a => a.sets)
    console.log(sets)
    //<div>{sets[index][ind].rep}x{sets[index][ind].weight}</div>

    return(
        <div className="workout-details">
            <h1 className="exercise-name">{title} on {day}</h1>
            <table className="exercise-table">
                <tr>
                    <th>Exercise Type</th>
                    <th>Exercise Name</th>
                    <th>Number of Sets</th>
                    <th>Rep x Weight</th>
                    <th>Duration(min)</th>
                    <th>Distance(mi)</th>
                    <th>PR</th>
                </tr>
            {exercise && exercise.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        {item.type === "Lift" && <td>{sets[index].length}</td>}
                        {item.type === "Cardio" && <td>-</td>}
                        {item.type === "Cardio" && <td>-</td>}
                        {item.type === "Lift" && 
                            <td>
                                {item.sets.map((it, ind) => (
                                    <div key={ind}>{item.sets[ind].rep}x{item.sets[ind].weight}</div>
                                ))}
                            </td>}
                        {item.type === "Cardio" && <td>{item.duration}</td>}
                        {item.type === "Cardio" && <td>{item.distance}</td>}
                        {item.type === "Lift" && <td>-</td>}
                        {item.type === "Lift" && <td>-</td>}
                        
                        <td>🍔</td>
                    </tr>
                ))}
            </table>
        </div>
    ) 
}

export default WorkoutDetails;