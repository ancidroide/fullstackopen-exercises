const SearchFilter = ( {handler, value} ) => {
    return (
            <div>
                filter shown with<input value={value} onChange={handler}></input>
            </div>
    )
}

export default SearchFilter