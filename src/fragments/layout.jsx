import Prompt from "./dialog/prompt";
import { useEffect, useState } from "react";

function Layout(props){
    const [prompt, usePrompt] = useState(undefined);

    useEffect(() => {
        usePrompt({
            title: "Sample",
            message: "My Message",
            positiveAction: {
                label: 'Okay',
                action: () => console.log('Okay click!') 
            },
            negativeAction: {
                label: 'Cancel',
                action: () => usePrompt(undefined)
            }
        });
    }, []);

    return <>

    <div className="base_container center_child" id="main_content_holder">
        <div id="dock_panel">
            <ul>
                <li><img src="https://img.icons8.com/pixels/45/control-panel.png" alt="dashboard-layout"/></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <div id="content">
            {props.content}
        </div>
        {prompt && 
        <Prompt title={prompt.title} message={prompt.message} positiveAction={prompt.positiveAction} negativeAction={prompt.negativeAction}/>
        }
    </div>
    </>
}

export default Layout;