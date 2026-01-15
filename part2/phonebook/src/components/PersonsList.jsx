import Person from "./Person"

const PersonsList = ( {filteredPersons} ) => {
    return (
        <div>
            {filteredPersons.map(person => 
                <Person key={person.id} name={person.name} number={person.number} />
            )}
        </div>
    )
}


export default PersonsList