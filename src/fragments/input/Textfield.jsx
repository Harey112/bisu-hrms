function Textfield(props){

    return <>
        <div>
            <p></p>
            <input 
                className="textfield"
                type={props.type} 
                name={(props.varName) ? props.varName : props.name.toLowerCase().replace(/\s/g, '').replace('-', '')}
                value={props.value}
                placeholder={props.placeholder ? props.placeholder : props.name}
                onChange={(e) => { props.onChange(e) }}
                autoComplete={props.autoComplete !== undefined ? props.autoComplete : 'off'}
            />
        </div>
    </>
}


export default Textfield;