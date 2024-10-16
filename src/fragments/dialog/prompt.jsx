import './style.css';


function Prompt(props){
    return<>
    <div className="content_container center_child dialog_base">
        <div className="dialog center_child">
            {props.title !== undefined && (
                <h3>{props.title}</h3>
            )}

            { props.message !== undefined && (
                <p>{props.message}</p>
            )}

            <div>
                <button className="neutral_button" onClick={props.negativeAction.action}>{props.negativeAction.label}</button>
                <button className="positive_button" onClick={props.positiveAction.action}>{props.positiveAction.label}</button>
            </div>
        </div>
    </div>
    </>
}


export default Prompt;