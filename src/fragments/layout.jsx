import { useNavigate } from "react-router-dom";

import Header from "./header/header";
import CustomContentDialog from "./dialog/content";
import Error from "./dialog/error";
import Message from "./dialog/message";
import Operation from "./dialog/operation";
import Prompt from "./dialog/prompt";


function Layout(props){
    const navigate = useNavigate();
    


    return <>
    
    <div className="base_container center_child" id="main_content_holder">
        <div className="header_holder center_child">
            <Header routePath={props.routePath}/>
        </div>
        <div id="dock_panel">
            <ul>
                {props.menu.map((item, i)=>{
                    return (
                    <li key={i} onClick={()=> {navigate(item.route)}} className={(item.isSelected) ? 'selected' : ''}>
                        <img src={item.icon} alt='item'/>
                        <p>{item.name}</p>
                    </li>);
                })}
            </ul>
        </div>
        <div id="content">
            {props.children}
        </div>
        {props.customContent && 
        <CustomContentDialog title={props.customContent.title} children={props.customContent.children}/>
        }

        {props.prompt && 
        <Prompt title={props.prompt.title} message={props.prompt.message} positiveAction={props.prompt.positiveAction} negativeAction={props.prompt.negativeAction}/>
        }

        {props.error && 
        <Error title={props.error.title} message={props.error.message} button={props.error.button}/>
        }

        {props.message && 
        <Message title={props.message.title} message={props.message.message} button={props.message.button}/>
        }

        {props.peration && 
        <Operation title={props.operation.title} message={props.operation.message}/>
        }


    </div>
    </>
}

export default Layout;