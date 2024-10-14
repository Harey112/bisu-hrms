function FormTextField(props){
      return (
            <div id="form_textfield_container" width={props.width ? props.width : '100%'}>
                  <input type={props.type} className={"form_field "+props.className} placeholder={props.label} name={props.name} required={props.required} />
                  <label htmlFor={props.name} className="form__label">{props.label}</label>
            </div>
      )
}


export default FormTextField;

