import './style.css';

function FormTextField(props){

      const id = Math.random().toString().replace("0.", '');
      

      return (
            <div className="input_container" style={{width :props.width ? props.width : '100%'}}>
                  <input type={props.type} className={"form_field "+props.className} name={props.name} placeholder={props.label} id={id} value={props.value} disabled={props.disable} onChange={(e)=>{props.onChange(e)}} required={props.required} />
                  <label htmlFor={id} className="form__label">{props.label}</label>
            </div>
      )
}


export default FormTextField;

