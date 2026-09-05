import type { ReactNode } from 'react';
import { motion } from 'motion/react';
export function Arrow({className=''}:{className?:string}) { return <svg className={`arrow ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5"/></svg> }
export function Mark(){return <svg className="mark" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 5 95 50 50 95 5 50Z" fill="none" stroke="currentColor"/><path d="M27 44v12m11-25v38m12-52v66m12-52v38m11-25v12" fill="none" stroke="currentColor" strokeWidth="5"/></svg>}
export function Chapter({number,children}:{number:string;children:ReactNode}){return <div className="chapter"><span>{number}</span><span>/</span>{children}</div>}
export function Reveal({children,className='',reduced=false}:{children:ReactNode;className?:string;reduced?:boolean}){return <motion.div className={className} initial={reduced?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:reduced?0:.65,ease:[.22,1,.36,1]}}>{children}</motion.div>}
export function PrintProof(){return <div className="print-proof" aria-label="A print proof showing five halftone densities">{[0,1,2,3,4].map(i=><span key={i} style={{backgroundSize:`${12-i*2}px ${12-i*2}px`}} />)}</div>}
