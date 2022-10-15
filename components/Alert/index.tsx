import React from "react";

interface IAlertProps {
    children: React.ReactNode
}


export const Alert = ({ children }: IAlertProps) => {
    return (
        <div className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
            {children}
        </div>
    )
}

export default Alert