import React, { FunctionComponent, useState } from "react";

interface Props {

}




export const EditorButton = ({ children, ...props }: React.PropsWithChildren) => {
    return (
        <div className="inline-block ml-4" {...props}>
            {children}
        </div>
    )
}

export default EditorButton