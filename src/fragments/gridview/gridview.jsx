import './style.css';
import base64Icons from "../../assets/icons";

function GridView(props){

    return <>
        <div id="listview_container" className="content_container">
            <ul>
                {props.items.map((item, i)=>{
                    return <li key={i} className={props.contentClassName} style={{width: props.itemDimension.width, height: props.itemDimension.height}} >{props.contentFunction(item)}</li>
                })}
            </ul>
        </div>
    </>
}


export default GridView;