import { useLayoutEffect,useRef,useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Chapter,Arrow } from './Primitives';
gsap.registerPlugin(ScrollTrigger);
const stages=['Tabs','Nodes','Roots','Circuits','Print','Signal'];
const captions=['Too many loops open.','The connections were always there.','A system grows from its roots.','Give the connections a structure.','Make an impression.','Many forms. One signal.'];
const names=['DESIGN','CODE','PRINT','CARE','WRITING','SYSTEMS'];
const points=Array.from({length:72},(_,i)=>({x:80+(i%12)*76,y:80+Math.floor(i/12)*45}));
// Identical cubic-path topology lets GSAP interpolate the same lines between domains.
function pathFor(i:number,stage:number){const side=i<6?-1:1;const n=i%6;const x=500+side*(120+n*53);const y=65+n*36;
 if(stage===1)return `M500 220 C${500+side*50} 220 ${x} 220 ${x} ${y} C${x} ${y} ${x} ${y} ${x} ${y}`;
 if(stage===2)return `M500 60 C${500+side*8} 150 ${500+side*(35+n*17)} 150 ${500+side*(60+n*30)} ${185+n*15} C${x-side*30} ${230+n*7} ${x+side*15} ${260+n*6} ${x} ${310+n*9}`;
 return `M500 220 C${500+side*60} 220 ${500+side*60} 220 ${500+side*60} ${y} C${500+side*60} ${y} ${x} ${y} ${x} ${y}`;
}
export default function Compression({reduced}:{reduced:boolean}){
 const root=useRef<HTMLElement>(null);const timeline=useRef<gsap.core.Timeline|null>(null);const [stage,setStage]=useState(0);
 useLayoutEffect(()=>{
  if(reduced){setStage(5);return;}
  const ctx=gsap.context(()=>{
   const tl=gsap.timeline({defaults:{ease:'power2.inOut'},scrollTrigger:{trigger:root.current,start:'top top',end:()=>`+=${window.innerHeight*3.6}`,pin:true,scrub:.7,invalidateOnRefresh:true,onUpdate:self=>setStage(Math.min(5,Math.floor(self.progress*5.99)))}});timeline.current=tl;
   gsap.set('.traces',{opacity:0});gsap.set('.signal-mark',{opacity:0,scale:.6,transformOrigin:'500px 220px'});gsap.set('.print-dot',{opacity:0});
   tl.to('.input-tab',{attr:{rx:20,width:36,height:36},duration:.8,stagger:.015},0).to('.tab-label',{opacity:0,duration:.3},0).to('.traces',{opacity:.8,duration:.5},.5);
   for(let i=0;i<12;i++){tl.to(`.trace-${i}`,{attr:{d:pathFor(i,2)},duration:.9},1.2).to(`.trace-${i}`,{attr:{d:pathFor(i,3)},duration:.9},2.4);}
   tl.to('.input-tab',{opacity:0,duration:.6},1.2).to('.domain-label',{opacity:.25,duration:.6},1.2).to('.traces',{opacity:0,duration:.6},3.5);
   tl.to('.print-dot',{opacity:1,duration:.5,stagger:{amount:.3}},3.5).to('.print-dot',{attr:{cx:(i:number)=>470+(i%6)*12,cy:(i:number)=>135+Math.floor(i/6)*15},opacity:0,duration:.8,stagger:{amount:.2}},4.5).to('.signal-mark',{opacity:1,scale:1,duration:.8},4.8).to('.domain-label',{opacity:1,duration:.4},5).to({}, {duration:.4});
  },root);return()=>{ctx.revert();timeline.current=null;};
 },[reduced]);
 function jump(i:number){const st=timeline.current?.scrollTrigger;if(st)window.scrollTo({top:st.start+(st.end-st.start)*((i+.2)/6),behavior:'instant'});else setStage(i);}
 return <section ref={root} id="compression" className={`compression section ${reduced?'is-static':''}`}><Chapter number="03">The compression</Chapter><h2>Different inputs.<br/>Same <em>instinct.</em></h2><div className="compression-canvas"><svg viewBox="0 0 1000 420" role="img" aria-label="Fragments connect as a network, grow into roots, align as circuits and resolve into a signal mark"><g className="traces" fill="none" stroke="currentColor" strokeWidth="1.3">{Array.from({length:12},(_,i)=><path className={`trace-${i}`} key={i} d={pathFor(i,1)}/>)}</g>{names.map((name,i)=>{const x=i<3?90+i*145:650+(i-3)*110;return <g key={name}><rect className="input-tab" x={x-50} y={125+(i%2)*60} width="100" height="46" rx="1" fill="#252620" stroke="#ce744b"/><text className="tab-label" x={x} y={153+(i%2)*60} textAnchor="middle">{name.toLowerCase()}.txt</text><text className="domain-label" x={x} y="50" textAnchor="middle">{name}</text></g>})}<g fill="currentColor">{points.map((p,i)=><circle className="print-dot" key={i} cx={p.x} cy={p.y} r={2+(i%5)} />)}</g><g className="signal-mark"><path d="M500 115 605 220 500 325 395 220Z" fill="none" stroke="currentColor"/><circle cx="500" cy="220" r="118" fill="none" stroke="currentColor" opacity=".2"/><path d="M465 210v20m17-50v80m18-105v130m18-105v80m17-50v20" stroke="currentColor" strokeWidth="10"/><path d="M500 80v280M360 220h280" stroke="currentColor" opacity=".2"/></g></svg><div className="compression-caption"><span className="accent">/</span><p>{captions[stage]}<br/><span className="muted">Stripped of everything but what matters.</span></p></div></div><div className="stage-rail" aria-label="Animation stages">{stages.map((s,i)=><button key={s} onClick={()=>jump(i)} disabled={reduced} aria-pressed={stage===i} className={stage===i?'active':''}><span className="stage-number">0{i+1} / </span>{s}</button>)}</div><a href="#work" className="skip-sequence mono">Skip to the work <Arrow/></a></section>
}
