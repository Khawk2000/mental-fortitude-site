
//Need to make separate page for workout details similar to blogs 
const WorkoutDetails = ({ workout }) => {
    const {day, title, exercise} = workout
    return(
        <div className="workout-details">
            <h1 className="exercise-name">{title} on {day}</h1>
            <table className="exercise-table">
                <tr>
                    <th>Exercise Type</th>
                    <th>Exercise Name</th>
                    <th>Rounds x Reps</th>
                    <th>Weight</th>
                    <th>Duration(min)</th>
                    <th>Distance(mi)</th>
                    <th>PR</th>
                </tr>
            {exercise && exercise.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        {item.type === "Lift" && <td>{item.sets.rounds}x{item.sets.reps}</td>}
                        {item.type === "Cardio" && <td></td>}
                        <td>{item.sets.weight}</td>
                        <td>{item.sets.duration}</td>
                        <td>{item.sets.distance}</td>
                        <td>🍔</td>
                    </tr>
                ))}
            </table>
        </div>
    ) 
}

export default WorkoutDetails;