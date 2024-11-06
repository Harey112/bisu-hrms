import './style.css';
import React from 'react'

function GridView(props) {
    return (
        <div id="listview_container" className="content_container">
            <div>
                {props.items.map((data, i) => {
                    return (
                        <div
                            key={i}
                            className={props.contentClassName}
                            style={{ width: props.itemDimension.width, height: props.itemDimension.height }}
                        >
                            {React.createElement(props.contentComponent, { ...data })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default GridView;
