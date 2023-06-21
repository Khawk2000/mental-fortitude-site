
//Need to make separate page for workout details similar to blogs 
const WorkoutDetails = ({ workout }) => {
    const {exercise} = workout
    return(
        <div className="workout-details">
            {exercise && exercise.map((item, index) => (
                    <div key={index}>
                        <h2>Name: {item.name}</h2>
                        <h4>Type: {item.type}</h4>
                    </div>
                ))}
        </div>
    ) 
}

export default WorkoutDetails;