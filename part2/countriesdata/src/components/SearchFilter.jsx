const SearchFilter = ( {handler, value} ) => {
    return (
            <div>
                find countries <input value={value} onChange={handler}></input>
            </div>
    )
}

export default SearchFilter