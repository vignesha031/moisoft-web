import {useState,useEffect} from 'react';
type AnalyticsWindow=Window & {dataLayer?:unknown[];gtag?:(...args:unknown[])=>void};
export function Analytics(){const id=import.meta.env.VITE_GA_ID as string | undefined;const [consent,setConsent]=useState(false);
 useEffect(()=>{if(!id||!consent)return;const listener=(event:MouseEvent)=>{const a=(event.target as Element).closest('a');if(!a)return;const href=a.getAttribute('href')||'';const name=href.includes('wa.me')?'whatsapp_click':href.startsWith('tel:')?'call_click':href==='#booking'?'booking_enquiry_click':href.includes('play.google')?'google_play_click':href.includes('instagram.com')?'instagram_click':href.includes('share.google')?'directions_click':null;if(name)(window as AnalyticsWindow).gtag?.('event',name);};document.addEventListener('click',listener);return()=>document.removeEventListener('click',listener);},[id,consent]);
 if(!id||!/^G-[A-Z0-9]+$/.test(id))return null;
 return <><div className="analytics-consent"><span>Optional usage measurement with Google Analytics.</span><button onClick={()=>setConsent(v=>!v)}>{consent?'Turn off analytics':'Allow analytics this visit'}</button></div>{consent&&<><GtagScript id={id}/></>}</>;
}

function GtagScript({id}:{id:string}){
 useEffect(()=>{
  const w=window as AnalyticsWindow;
  w.dataLayer=w.dataLayer||[];
  w.gtag=function(){w.dataLayer!.push(arguments);};
  w.gtag('js',new Date());
  w.gtag('config',id,{send_page_view:false});
  const el=document.createElement('script');
  el.async=true;el.src=`https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(el);
  return()=>{el.remove();};
 },[id]);
 return null;
}
