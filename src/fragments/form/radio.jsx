import './style.css'


function FormSelect(props){
    return <>
        <div className="input_container" style={{width :props.width ? props.width : '100%'}}>
            <select name={props.name} >
            {props.choices.map((choice, i)=>{
                return <option key={i} value={choice}>{choice}</option>
            })}
            </select>
            <label htmlFor={props.name} className="form__label">{props.label}</label>
        </div>
    </>
}


export default FormSelect;