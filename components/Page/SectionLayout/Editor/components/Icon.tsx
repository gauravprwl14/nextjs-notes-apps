import React, { FunctionComponent, useState } from "react";

interface Props {

}




export const Icon = ({ children }: React.PropsWithChildren) => {
    return (
        <div className=" cursor-pointer">
            {children}
        </div>
    )
}

export default Icon