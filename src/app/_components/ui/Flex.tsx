import React, { ReactNode } from 'react'

function Flex({children, className}: {children: ReactNode, className?: string}) {
    return (
        <div className={'flex ' + className}>{children}</div>
    )
}

export default Flex