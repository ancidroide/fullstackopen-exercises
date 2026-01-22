import Person from "./Person"

const PersonsList = ( {filteredPersons, onDeletePerson} ) => {
    return (
        <div>
            {filteredPersons.map(person => 
                <Person key={person.id} 
                        name={person.name} 
                        number={person.number} 
                        id={person.id} 
                        handleDelete={onDeletePerson}/>
            )}
        </div>
    )
}


export default PersonsList