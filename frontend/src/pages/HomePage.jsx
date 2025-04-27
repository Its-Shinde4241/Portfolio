import React from 'react'
import NumberGrid from './Home'
import RippleEffect from './RippleEffect'

function HomePage() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-background dark:bg-background'>
            <NumberGrid />
            {/* <RippleEffect /> */}
        </div>
    )
}

export default HomePage