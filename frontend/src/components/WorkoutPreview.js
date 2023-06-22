
//Need to make separate page for workout details similar to blogs 
const WorkoutPreview = ({ workout }) => {
    const {day, title} = workout;
    return(
        <div className="workout-preview">
            <h2>{title}</h2>
            <p>{day}</p>
        </div>
    )
}

export default WorkoutPreview;