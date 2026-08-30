const PersonForm = ({ newName, newNumber, handleNameChange, handleNumChange, handleSubmit }) => {
    // console.log("current name is", newName);
    // console.log("current number is", newNumber);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value = {newName} onChange = {handleNameChange}/>
            </div>
            <div>
                number: <input value = {newNumber} onChange = {handleNumChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
}

export default PersonForm;