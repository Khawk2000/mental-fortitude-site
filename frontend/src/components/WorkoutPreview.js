
//simple component with day and title of workout for home page
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