function Textfield(props){

    return <>
        <div id="textfield_div">
            <p id="label">{props.name}</p>
            <input
                id="textfield"
                type={props.type} 
                name={(props.varName) ? props.varName : props.name.toLowerCase().replace(/\s/g, '').replace('-', '')}
                value={props.value}
                placeholder={props.placeholder}
                onChange={(e) => { props.onChange(e) }}
                autoComplete={props.autoComplete !== undefined ? props.autoComplete : 'off'}
            />
        </div>
    </>
}


export default Textfield;