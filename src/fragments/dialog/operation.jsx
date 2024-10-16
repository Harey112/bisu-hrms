import './style.css';

function Operation(props){
    return<>
    <div className="content_container center_child dialog_base">
        <div className="dialog center_child operation_dialog">
            {props.title !== undefined && (
                <h3>{props.title}</h3>
            )}

            { props.message !== undefined && (
                <p>{props.message}</p>
            )}
        </div>
    </div>
    </>
}


export default Operation;