
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
                    <th>Duration</th>
                    <th>Distance</th>
                    <th>PR</th>
                </tr>
            {exercise && exercise.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.sets.rounds}x{item.sets.reps}</td>
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