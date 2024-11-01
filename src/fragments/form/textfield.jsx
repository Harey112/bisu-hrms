import './style.css';

function FormTextField(props){
      return (
            <div className="input_container" style={{width :props.width ? props.width : '100%'}}>
                  <input type={props.type} className={"form_field "+props.className} placeholder={props.label} id={props.name} required={props.required} />
                  <label htmlFor={props.name} className="form__label">{props.label}</label>
            </div>
      )
}


export default FormTextField;

