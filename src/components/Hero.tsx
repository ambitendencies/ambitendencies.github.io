import { useLayoutEffect,useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Arrow } from './Primitives';
gsap.registerPlugin(ScrollTrigger);
export default function Hero({reduced}:{reduced:boolean}){
 const root=useRef<HTMLElement>(null);
 useLayoutEffect(()=>{
  if(reduced)return;
  const ctx=gsap.context(()=>{
   gsap.from('.hero-line',{y:50,opacity:0,stagger:.12,duration:1,ease:'power3.out'});
   gsap.from('.archive-machine',{opacity:0,scale:1.04,duration:1.3,ease:'power2.out'});
   gsap.to('.archive-machine',{y:-70,rotation:-3,scrollTrigger:{trigger:root.current,start:'top top',end:'bottom top',scrub:1}});
  },root);return()=>ctx.revert();
 },[reduced]);
 return <section ref={root} className="hero" id="top" aria-labelledby="hero-title">
 <div className="hero-main"><div className="hero-copy"><h1 id="hero-title"><span className="hero-line">Signal</span><span className="hero-line">through</span><em className="hero-line">noise.</em></h1><p className="hero-line">I build systems for messy problems.</p></div>
 <div className="archive-machine"><img src="/assets/artifacts.jpg" alt="Root drawings, halftone print proofs, and circuit notes layered on a workbench" fetchPriority="high" width="1536" height="1024"/><div className="terminal"><span>ben@signal:~$</span><p>&gt; scan environment<br/>&gt; filter noise<br/>&gt; extract signal<br/>&gt; build<br/>&gt; iterate<br/>&gt; ship</p><span>ben@signal:~$ <i className="cursor"/></span></div></div></div>
 <div className="hero-bottom"><a href="#inventory" className="scroll-cue"><span className="scroll-icon"><Arrow/></span>Scroll to begin</a><span className="rule"/><span className="chapter-large">01</span><span className="mono">/ The lag</span></div>
 </section>
}
