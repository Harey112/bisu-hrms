function Error(props){
    return<>
    <div className="content_container center_child dialog_base">
        <div className="dialog center_child error_dialog">
            {props.title !== undefined && (
                <h3>{props.title}</h3>
            )}

            { props.message !== undefined && (
                <p>{props.message}</p>
            )}

            <div>
                <button className="neutral_button" onClick={props.button.action}>{props.button.label}</button>
            </div>
        </div>
    </div>
    </>
}


export default Error;