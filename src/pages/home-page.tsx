import {FC} from 'react'
 

import Header from '../components/Header'
import ExploreMore from '../components/ExploreMore'
import WhyBookWithUs from '../components/WhyBookWithUs'
import ExploreAIFeatures from '../components/ExploreAIFeatures'



const HomePage : FC  = () => {

    return (
        <>
        <div className='flex flex-col min-h-screen ' >
         <Header/>
 
        <main className='flex-grow mt-20' >
        <ExploreMore/>
        <WhyBookWithUs/>
         <ExploreAIFeatures/>
        </main>
           
        
       </div>
        </>
    )
}
export default HomePage