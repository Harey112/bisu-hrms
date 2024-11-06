import './style.css'


function FormSelect(props){
    const id = Math.random().toString().replace("0.", "");
    return <>
        <div className="input_container" style={{width :props.width ? props.width : '100%'}}>
            <select id={id} value={props.value} name={props.name} onChange={(e)=>{props.onChange(e)}}>
            {props.choices.map((choice, i)=>{
                return <option key={i} value={choice}>{choice}</option>
            })}
            </select>
            <label htmlFor={id} className="form__label">{props.label}</label>
        </div>
    </>
}


export default FormSelect;