function CustomContentDialog(props) {
    return<>
    <div className="content_container center_child dialog_base">
        <div className="dialog center_child custom_content_dialog">
            {props.title !== undefined && (
                <h3>{props.title}</h3>
            )}

            {props.children}
        </div>
    </div>
    </>
}

export default CustomContentDialog;
