import './style.css';

function Textfield(props){

    return <>
        <div className="textfield_div">
            <p className="label">{props.name}</p>
            <input
                className="textfield"
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