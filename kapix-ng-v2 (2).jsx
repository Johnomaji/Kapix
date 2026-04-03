import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { LayoutDashboard, CreditCard, Shield, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, Bell, Search, AlertTriangle, CheckCircle, XCircle, Zap, Target, ArrowRight, Copy, Check, Menu, ChevronRight, ChevronDown, Cpu, Server, Wifi, Lock, Globe, Code, Eye, EyeOff, X, Filter, RefreshCw, Download, Settings, LogOut, HelpCircle, FileText, Hash, PieChart as PieIcon, Users, Clock, MapPin, Smartphone, Building, Fingerprint, CreditCard as CardIcon, Wallet, Send } from "lucide-react";

/* ═══════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════ */
const T = {
  em:"#00D4AA", emL:"#4AE8C8", emD:"rgba(0,212,170,0.07)", emG:"rgba(0,212,170,0.22)", emB:"rgba(0,212,170,0.12)",
  bl:"#3B82F6", blD:"rgba(59,130,246,0.07)",
  nv:"#050810", gr:"#0A0E17", sl:"#121621", st:"#1A1F30", stL:"#242A3D",
  gh:"#3E4660", mi:"#6B7694", sv:"#B5BDD0",
  rd:"#F04444", rdD:"rgba(240,68,68,0.07)", rdB:"rgba(240,68,68,0.12)",
  am:"#F5A623", amD:"rgba(245,166,35,0.07)", amB:"rgba(245,166,35,0.12)",
  gn:"#0ECB81", gnD:"rgba(14,203,129,0.07)", gnB:"rgba(14,203,129,0.12)",
  vt:"#8B5CF6", vtD:"rgba(139,92,246,0.07)",
  pk:"#E74694",
};

/* ═══════════════════════════════════════
   NIGERIAN FINTECH DATA
   ═══════════════════════════════════════ */
const BANKS = ["GTBank","Access Bank","First Bank","UBA","Zenith Bank","Stanbic IBTC","Sterling Bank","Fidelity Bank","FCMB","Wema Bank"];
const FINTECHS = ["OPay","PalmPay","Moniepoint","Kuda","Carbon","FairMoney","Paga","Flutterwave","Paystack","Interswitch"];
const ENTITIES = ["Dangote Industries","Shoprite NG","MTN Nigeria","Jumia NG","BUA Cement","Seplat Energy","Airtel NG","Bet9ja","PiggyVest","Cowrywise","Andela","Korapay","ChiChi Foods","TechCabal Media","Vendease","Shuttlers","TradeDepot","Helium Health","Reliance HMO","MAX.ng"];
const CHANNELS = ["Bank Transfer","USSD","POS Terminal","Mobile Money","NIP Transfer","Card Payment","QR Payment","Direct Debit"];
const STATES = ["Lagos","Abuja FCT","Rivers (PH)","Kano","Oyo","Edo","Delta","Kaduna","Ogun","Anambra","Enugu","Imo"];
const ZONES = ["South-West","South-East","South-South","North-Central","North-West","North-East"];

const fmtNGN = (v) => `₦${v >= 1e9 ? (v/1e9).toFixed(1)+"B" : v >= 1e6 ? (v/1e6).toFixed(1)+"M" : v >= 1e3 ? (v/1e3).toFixed(1)+"K" : v.toLocaleString()}`;

const genTS = (n, base, v, t=0) => Array.from({length:n},(_,i)=>({ t:`${String(i).padStart(2,"0")}:00`, v:+(base+t*i+(Math.random()-0.5)*v).toFixed(2) }));

const genMonthly = () => "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",").map((m,i)=>({
  m, scoring:~~(48000+i*6200+Math.random()*12000), fraud:~~(1800+i*320+Math.random()*900), risk:~~(22000+i*3800+Math.random()*8000)
}));

const TXS = Array.from({length:120},(_,i)=>{
  const sts = ["approved","approved","approved","approved","approved","flagged","declined","pending"];
  const s = sts[~~(Math.random()*sts.length)];
  const amt = ~~(2500+Math.random()*4750000);
  return {
    id:`KPX-${String(100000+i).slice(1)}`, entity:ENTITIES[~~(Math.random()*ENTITIES.length)],
    channel:CHANNELS[~~(Math.random()*CHANNELS.length)], amount:amt,
    risk:+(Math.random()).toFixed(3), status:s, bvn:s!=="declined"?"Verified":"Unverified",
    time:`${~~(Math.random()*24)}:${String(~~(Math.random()*60)).padStart(2,"0")}`,
    date:`2026-03-${String(~~(Math.random()*30)+1).padStart(2,"0")}`,
    state:STATES[~~(Math.random()*STATES.length)],
    bank: [...BANKS,...FINTECHS][~~(Math.random()*20)],
    session: `NIBSS-${String(~~(Math.random()*999999)).padStart(6,"0")}`,
  };
}).sort((a,b)=>b.date.localeCompare(a.date));

const ALERTS = [
  {id:"KA-001",sev:"critical",title:"BVN mismatch on high-value NIP transfer",ent:"Unknown — Session NIBSS-884210",amt:fmtNGN(28400000),time:"2 min ago",detail:"BVN linked to originator account does not match NIN records. ₦28.4M NIP transfer to Tier-1 account at GTBank flagged. CBN threshold exceeded.",actions:["Freeze Account","Escalate to CBN","Dismiss"]},
  {id:"KA-002",sev:"critical",title:"POS terminal velocity spike — Port Harcourt",ent:"ChiChi Foods — Terminal PH-0442",amt:fmtNGN(4200000),time:"8 min ago",detail:"142 transactions in 12 minutes on single POS terminal. Average ticket ₦29,500 — 8x normal. Pattern matches known POS fraud ring operating in Rivers State.",actions:["Block Terminal","Flag Merchant","Review"]},
  {id:"KA-003",sev:"high",title:"USSD session hijacking pattern",ent:"Kuda Bank — User cluster Kano",amt:fmtNGN(890000),time:"24 min ago",detail:"Repeated USSD dial-ins from unregistered SIMs targeting Kuda accounts. 14 failed OTP attempts followed by successful transfer. SIM swap suspected.",actions:["Lock Accounts","Alert Kuda","Investigate"]},
  {id:"KA-004",sev:"high",title:"Cross-border structuring below CBN threshold",ent:"TradeDepot — Multi-account",amt:fmtNGN(9800000),time:"48 min ago",detail:"Seven transfers of ₦1.4M each to domiciliary accounts within 30 minutes. Structured to avoid ₦10M CBN reporting threshold. All originating from same BVN.",actions:["Flag Entity","Report SAR","Review"]},
  {id:"KA-005",sev:"medium",title:"Dormant account reactivation surge",ent:"Multiple — Wema Bank batch",amt:fmtNGN(12600000),time:"1.5 hr ago",detail:"34 dormant accounts (>2 years inactive) reactivated and funded within same hour. All accounts opened at Wema Bank Ikeja branch. Coordinated activity suspected.",actions:["Flag Batch","Alert Wema","Monitor"]},
  {id:"KA-006",sev:"low",title:"New API integration — unusual volume",ent:"Paystack Merchant API",amt:"N/A",time:"3 hr ago",detail:"Newly onboarded Paystack merchant processing 4x projected volume in first 24 hours. No fraud indicators yet but monitoring threshold exceeded.",actions:["Monitor","Contact Merchant","Clear"]},
];

/* ═══════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════ */
const useMount = () => { const [m,s]=useState(false); useEffect(()=>{const t=setTimeout(()=>s(true),40);return()=>clearTimeout(t)},[]);return m; };
const useAnimNum = (target,dur=1200,delay=0) => {
  const [v,setV]=useState(0);
  useEffect(()=>{
    const t=setTimeout(()=>{
      const s=performance.now();
      const tick=(now)=>{ const p=Math.min((now-s)/dur,1); setV(target*(1-Math.pow(1-p,3))); if(p<1)requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    },delay);
    return()=>clearTimeout(t);
  },[target,dur,delay]);
  return v;
};
const useTime = () => { const [t,s]=useState(new Date()); useEffect(()=>{const i=setInterval(()=>s(new Date()),1000);return()=>clearInterval(i)},[]);return t; };

/* ═══════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════ */
const An = ({children,d=0,show=true,y=20,s:style={}}) => (
  <div style={{opacity:show?1:0,transform:show?"translateY(0)":`translateY(${y}px)`,transition:`opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${d}ms`,...style}}>{children}</div>
);

const Badge = ({children,c="em"}) => {
  const m={em:[T.emD,T.em,T.emB],bl:[T.blD,T.bl,"rgba(59,130,246,0.12)"],rd:[T.rdD,T.rd,T.rdB],am:[T.amD,T.am,T.amB],gn:[T.gnD,T.gn,T.gnB],gh:["rgba(62,70,96,0.12)",T.mi,"rgba(62,70,96,0.18)"],vt:[T.vtD,T.vt,"rgba(139,92,246,0.12)"]};
  const [bg,fg,bd]=m[c]||m.em;
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 9px",borderRadius:5,fontSize:10,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",fontFamily:"var(--mono)",background:bg,color:fg,border:`1px solid ${bd}`}}>{children}</span>;
};

const Pulse = ({color=T.em,s=6}) => (
  <div style={{position:"relative",width:s,height:s}}>
    <div style={{position:"absolute",inset:0,borderRadius:"50%",background:color}}/>
    <div style={{position:"absolute",inset:-3,borderRadius:"50%",background:color,opacity:0.3,animation:"pulseRing 2s ease infinite"}}/>
  </div>
);

const SDot = ({status}) => {
  const c=status==="approved"?T.gn:status==="flagged"?T.am:status==="declined"?T.rd:T.bl;
  return <div style={{width:7,height:7,borderRadius:"50%",background:c,boxShadow:`0 0 8px ${c}40`}}/>;
};

const Tip = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return <div style={{background:T.sl,border:`1px solid ${T.st}`,borderRadius:8,padding:"10px 14px",boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}}>
    <div style={{fontFamily:"var(--mono)",fontSize:10,color:T.gh,marginBottom:5}}>{label}</div>
    {payload.map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6,fontFamily:"var(--mono)",fontSize:11,color:p.color||"#fff"}}><div style={{width:6,height:6,borderRadius:"50%",background:p.color}}/>{p.name}: <strong>{typeof p.value==="number"?p.value.toLocaleString():p.value}</strong></div>)}
  </div>;
};

const Spark = ({data,color=T.em,h=36}) => (
  <ResponsiveContainer width="100%" height={h}>
    <AreaChart data={data} margin={{top:2,right:0,bottom:2,left:0}}>
      <defs><linearGradient id={`s${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.25}/><stop offset="100%" stopColor={color} stopOpacity={0}/></linearGradient></defs>
      <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#s${color.slice(1)})`} dot={false} isAnimationActive animationDuration={1200}/>
    </AreaChart>
  </ResponsiveContainer>
);

/* ═══════════════════════════════════════
   METRIC CARD (enhanced)
   ═══════════════════════════════════════ */
const MC = ({label,value,change,dir,icon:Icon,accent=T.em,sub,d=0,show=true,spark}) => {
  const [h,setH]=useState(false);
  return <An d={d} show={show}>
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:T.gr,border:`1px solid ${h?"rgba(0,212,170,0.15)":T.st}`,borderRadius:14,padding:"18px 20px",display:"flex",flexDirection:"column",gap:5,transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)",transform:h?"translateY(-3px) scale(1.005)":"none",boxShadow:h?"0 12px 40px rgba(0,0,0,0.3)":"none",position:"relative",overflow:"hidden",cursor:"default"}}>
      {h&&<div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${T.emG},transparent)`,animation:"shimmer 0.8s ease"}}/>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <span style={{fontFamily:"var(--mono)",fontSize:9.5,fontWeight:600,color:T.gh,letterSpacing:"0.08em",textTransform:"uppercase"}}>{label}</span>
        {Icon&&<div style={{width:32,height:32,borderRadius:8,background:`${accent}10`,display:"flex",alignItems:"center",justifyContent:"center",transition:"transform 0.3s",transform:h?"scale(1.12) rotate(-4deg)":"none"}}><Icon size={15} color={accent}/></div>}
      </div>
      <div style={{fontFamily:"var(--head)",fontSize:24,fontWeight:700,letterSpacing:"-0.02em",color:"#fff"}}>{value}</div>
      <div style={{display:"flex",alignItems:"center",gap:7}}>
        {change&&<span style={{display:"flex",alignItems:"center",gap:2,fontFamily:"var(--mono)",fontSize:10.5,fontWeight:600,color:dir==="up"?T.gn:dir==="down"?T.rd:T.mi}}>
          {dir==="up"?<ArrowUpRight size={11}/>:dir==="down"?<ArrowDownRight size={11}/>:null}{change}
        </span>}
        {sub&&<span style={{fontFamily:"var(--body)",fontSize:11,color:T.gh}}>{sub}</span>}
      </div>
      {spark&&<div style={{marginTop:2}}>{spark}</div>}
    </div>
  </An>;
};

/* ═══════════════════════════════════════
   TOAST NOTIFICATION SYSTEM
   ═══════════════════════════════════════ */
const ToastCtx = ({toasts,dismiss}) => (
  <div style={{position:"fixed",bottom:20,right:20,zIndex:999,display:"flex",flexDirection:"column-reverse",gap:8}}>
    {toasts.map((t,i)=>(
      <div key={t.id} style={{background:T.sl,border:`1px solid ${t.type==="success"?T.gnB:t.type==="error"?T.rdB:T.stL}`,borderRadius:10,padding:"12px 16px",display:"flex",alignItems:"center",gap:10,minWidth:300,boxShadow:"0 8px 32px rgba(0,0,0,0.5)",animation:"toastIn 0.35s cubic-bezier(0.16,1,0.3,1)",cursor:"pointer"}} onClick={()=>dismiss(t.id)}>
        <div style={{width:8,height:8,borderRadius:"50%",background:t.type==="success"?T.gn:t.type==="error"?T.rd:T.am,flexShrink:0}}/>
        <div style={{flex:1}}>
          <div style={{fontFamily:"var(--head)",fontSize:12,fontWeight:600,color:"#fff"}}>{t.title}</div>
          <div style={{fontFamily:"var(--mono)",fontSize:10,color:T.mi,marginTop:1}}>{t.msg}</div>
        </div>
        <X size={13} color={T.gh}/>
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════
   COMMAND PALETTE (Ctrl+K)
   ═══════════════════════════════════════ */
const CmdPalette = ({open,onClose,onNav}) => {
  const [q,setQ]=useState("");
  const ref=useRef(null);
  useEffect(()=>{if(open&&ref.current)ref.current.focus();setQ("");},[open]);
  const cmds=[
    {id:"dash",label:"Go to Dashboard",icon:LayoutDashboard,cat:"Navigation"},
    {id:"score",label:"Credit Scoring Engine",icon:CreditCard,cat:"Navigation"},
    {id:"fraud",label:"Fraud Detection Centre",icon:Shield,cat:"Navigation"},
    {id:"risk",label:"Risk Assessment",icon:TrendingUp,cat:"Navigation"},
    {id:"txns",label:"Transaction Monitor",icon:Activity,cat:"Navigation"},
    {id:"api",label:"API Console",icon:Code,cat:"Navigation"},
    {id:"bvn",label:"Run BVN Verification",icon:Fingerprint,cat:"Actions"},
    {id:"nin",label:"NIN Lookup",icon:Users,cat:"Actions"},
    {id:"export",label:"Export Report (CSV)",icon:Download,cat:"Actions"},
    {id:"nibss",label:"Check NIBSS Session",icon:Server,cat:"Actions"},
  ];
  const filtered=cmds.filter(c=>c.label.toLowerCase().includes(q.toLowerCase()));
  if(!open) return null;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(5,8,16,0.7)",backdropFilter:"blur(8px)",zIndex:500,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"15vh",animation:"fadeIn 0.15s ease"}} onClick={onClose}>
      <div style={{width:520,background:T.sl,border:`1px solid ${T.st}`,borderRadius:14,boxShadow:"0 24px 80px rgba(0,0,0,0.6)",overflow:"hidden",animation:"cmdIn 0.25s cubic-bezier(0.16,1,0.3,1)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:`1px solid ${T.st}`}}>
          <Search size={16} color={T.mi}/>
          <input ref={ref} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search commands, entities, BVN..." style={{flex:1,border:"none",background:"transparent",color:"#fff",fontFamily:"var(--body)",fontSize:15,outline:"none"}}/>
          <kbd style={{fontFamily:"var(--mono)",fontSize:9,color:T.gh,background:T.st,padding:"2px 6px",borderRadius:4}}>ESC</kbd>
        </div>
        <div style={{maxHeight:340,overflowY:"auto",padding:"6px"}}>
          {["Navigation","Actions"].map(cat=>{
            const items=filtered.filter(c=>c.cat===cat);
            if(!items.length)return null;
            return <div key={cat}>
              <div style={{fontFamily:"var(--mono)",fontSize:9,color:T.gh,letterSpacing:"0.08em",textTransform:"uppercase",padding:"8px 12px",fontWeight:600}}>{cat}</div>
              {items.map(c=>(
                <button key={c.id} onClick={()=>{if(c.cat==="Navigation")onNav(c.id);onClose();}}
                  style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",background:"transparent",color:T.sv,fontFamily:"var(--head)",fontSize:13,fontWeight:500,textAlign:"left",transition:"all 0.15s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background=T.st;e.currentTarget.style.color="#fff";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.sv;}}>
                  <c.icon size={16} color={T.mi}/>{c.label}<ChevronRight size={12} style={{marginLeft:"auto",opacity:0.3}}/>
                </button>
              ))}
            </div>;
          })}
          {!filtered.length&&<div style={{padding:20,textAlign:"center",fontFamily:"var(--body)",fontSize:13,color:T.gh}}>No results for "{q}"</div>}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════ */
const NAV=[
  {id:"dash",label:"Dashboard",icon:LayoutDashboard,desc:"Overview & KPIs"},
  {id:"score",label:"Credit Scoring",icon:CreditCard,desc:"BVN/NIN assessment"},
  {id:"fraud",label:"Fraud Centre",icon:Shield,desc:"Anomaly detection"},
  {id:"risk",label:"Risk Engine",icon:TrendingUp,desc:"Portfolio exposure"},
  {id:"txns",label:"Transactions",icon:Activity,desc:"NIP/USSD/POS monitor"},
  {id:"api",label:"API Console",icon:Code,desc:"Developer tools"},
];

const Side = ({active,onNav,col,onCol}) => (
  <aside style={{width:col?60:244,height:"100vh",background:T.gr,borderRight:`1px solid ${T.st}`,display:"flex",flexDirection:"column",transition:"width 0.3s cubic-bezier(0.16,1,0.3,1)",flexShrink:0,overflow:"hidden",zIndex:10}}>
    <div style={{padding:col?"16px 8px":"16px 16px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${T.st}`,minHeight:60}}>
      <svg viewBox="0 0 120 120" fill="none" style={{width:26,height:26,flexShrink:0}}>
        <line x1="28" y1="20" x2="28" y2="100" stroke={T.em} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="28" y1="60" x2="56" y2="60" stroke={T.em} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="56" y1="60" x2="88" y2="22" stroke={T.em} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="56" y1="60" x2="88" y2="98" stroke={T.em} strokeWidth="3.5" strokeLinecap="round"/>
        <circle cx="56" cy="60" r="7.5" fill={T.em}/><circle cx="56" cy="60" r="3.5" fill={T.gr}/>
        <circle cx="28" cy="60" r="4" fill={T.em}/>
      </svg>
      {!col&&<span style={{fontFamily:"var(--head)",fontWeight:700,fontSize:16,letterSpacing:"-0.02em",color:"#fff"}}>Kapix</span>}
      {!col&&<Badge c="em">NG</Badge>}
    </div>
    <nav style={{flex:1,padding:"10px 6px",display:"flex",flexDirection:"column",gap:1}}>
      {NAV.map((item,i)=>{
        const isA=active===item.id;
        return <button key={item.id} onClick={()=>onNav(item.id)} title={col?item.label:undefined}
          style={{display:"flex",alignItems:"center",gap:10,padding:col?"9px 12px":"8px 12px",borderRadius:8,border:"none",cursor:"pointer",transition:"all 0.2s",background:isA?T.emD:"transparent",color:isA?T.em:T.mi,fontFamily:"var(--head)",fontSize:12.5,fontWeight:isA?600:500,textAlign:"left",width:"100%",justifyContent:col?"center":"flex-start",position:"relative",animation:`fadeSlideIn 0.4s ease ${i*40+80}ms both`}}>
          {isA&&<div style={{position:"absolute",left:0,top:"18%",bottom:"18%",width:2.5,borderRadius:2,background:T.em}}/>}
          <item.icon size={17} style={{transition:"transform 0.2s",transform:isA?"scale(1.08)":"none",flexShrink:0}}/>
          {!col&&<div style={{overflow:"hidden"}}>
            <div style={{whiteSpace:"nowrap"}}>{item.label}</div>
            {isA&&<div style={{fontFamily:"var(--mono)",fontSize:9,color:T.gh,marginTop:-1}}>{item.desc}</div>}
          </div>}
        </button>;
      })}
    </nav>
    <div style={{padding:col?"8px":"10px 16px 14px",borderTop:`1px solid ${T.st}`}}>
      {!col&&<div style={{fontFamily:"var(--mono)",fontSize:9,color:T.gh,marginBottom:8,display:"flex",alignItems:"center",gap:5}}>
        <kbd style={{background:T.st,padding:"1px 5px",borderRadius:3,fontSize:9}}>⌘K</kbd> Command Palette
      </div>}
      <button onClick={onCol} style={{background:"none",border:"none",color:T.gh,cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontFamily:"var(--mono)",fontSize:10,width:"100%",justifyContent:col?"center":"flex-start",padding:"4px 0",transition:"color 0.2s"}}
        onMouseEnter={e=>e.currentTarget.style.color=T.mi} onMouseLeave={e=>e.currentTarget.style.color=T.gh}>
        <Menu size={14} style={{transition:"transform 0.3s",transform:col?"rotate(90deg)":"none"}}/>{!col&&"Collapse sidebar"}
      </button>
    </div>
  </aside>
);

/* ═══════════════════════════════════════
   TOP BAR (with CBN compliance badge)
   ═══════════════════════════════════════ */
const TopBar = ({page,onCmd,toastCount}) => {
  const [nOpen,setN]=useState(false);
  const now=useTime();
  const titles={dash:"Dashboard",score:"Credit Scoring Engine",fraud:"Fraud Detection Centre",risk:"Risk Assessment Engine",txns:"Transaction Monitor",api:"API Console"};
  const descs={dash:"Real-time operational overview",score:"BVN/NIN-linked entity assessment",fraud:"NIBSS anomaly detection & CBN alerts",risk:"Sectoral & geographic exposure",txns:"NIP · USSD · POS · Mobile Money",api:"REST API & webhook management"};
  return <header style={{height:56,borderBottom:`1px solid ${T.st}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 22px",background:T.gr,flexShrink:0}}>
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <h1 style={{fontFamily:"var(--head)",fontSize:15,fontWeight:600,color:"#fff",letterSpacing:"-0.01em"}}>{titles[page]}</h1>
          <Pulse size={5}/><span style={{fontFamily:"var(--mono)",fontSize:9,color:T.em,fontWeight:600}}>LIVE</span>
          <Badge c="gn">CBN Compliant</Badge>
        </div>
        <p style={{fontFamily:"var(--mono)",fontSize:9.5,color:T.gh,marginTop:1}}>{descs[page]}</p>
      </div>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <span style={{fontFamily:"var(--mono)",fontSize:10,color:T.gh,marginRight:6}}>{now.toLocaleTimeString("en-NG",{hour:"2-digit",minute:"2-digit",second:"2-digit"})} WAT</span>
      <button onClick={onCmd} style={{height:30,borderRadius:7,border:`1px solid ${T.st}`,background:"transparent",color:T.mi,cursor:"pointer",display:"flex",alignItems:"center",gap:6,padding:"0 10px",fontFamily:"var(--mono)",fontSize:10,transition:"all 0.2s"}}
        onMouseEnter={e=>e.currentTarget.style.borderColor=T.stL} onMouseLeave={e=>e.currentTarget.style.borderColor=T.st}>
        <Search size={12}/>Search<kbd style={{fontSize:8,background:T.st,padding:"1px 4px",borderRadius:3,marginLeft:6}}>⌘K</kbd>
      </button>
      <div style={{position:"relative"}}>
        <button onClick={()=>setN(!nOpen)} style={{width:32,height:32,borderRadius:8,border:`1px solid ${T.st}`,background:nOpen?T.sl:"transparent",color:T.mi,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",transition:"all 0.2s"}}>
          <Bell size={14}/>{toastCount>0&&<div style={{position:"absolute",top:4,right:4,width:7,height:7,borderRadius:"50%",background:T.rd,border:`2px solid ${T.gr}`}}/>}
        </button>
        {nOpen&&<div style={{position:"absolute",top:40,right:0,width:380,background:T.sl,border:`1px solid ${T.st}`,borderRadius:12,boxShadow:"0 16px 48px rgba(0,0,0,0.5)",zIndex:50,animation:"dropIn 0.25s cubic-bezier(0.16,1,0.3,1)",overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${T.st}`,display:"flex",justifyContent:"space-between"}}>
            <span style={{fontFamily:"var(--head)",fontWeight:600,fontSize:12,color:"#fff"}}>CBN Alerts & Notifications</span>
            <Badge c="rd">{ALERTS.length} Active</Badge>
          </div>
          {ALERTS.slice(0,4).map((a,i)=><div key={a.id} style={{padding:"11px 16px",borderBottom:`1px solid ${T.st}08`,cursor:"pointer",transition:"background 0.15s",animation:`fadeSlideIn 0.3s ease ${i*50}ms both`}}
            onMouseEnter={e=>e.currentTarget.style.background=T.st} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:2}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:a.sev==="critical"?T.rd:a.sev==="high"?T.am:T.bl}}/>
              <span style={{fontFamily:"var(--head)",fontSize:11.5,fontWeight:600,color:"#fff",flex:1}}>{a.title}</span>
              <span style={{fontFamily:"var(--mono)",fontSize:9,color:T.gh}}>{a.time}</span>
            </div>
            <div style={{fontFamily:"var(--mono)",fontSize:9.5,color:T.gh,paddingLeft:13}}>{a.ent} · {a.amt}</div>
          </div>)}
          <div style={{padding:"10px 16px",textAlign:"center"}}><span style={{fontFamily:"var(--head)",fontSize:11,color:T.em,cursor:"pointer",fontWeight:600}}>View All Alerts →</span></div>
        </div>}
      </div>
      <div style={{width:1,height:22,background:T.st,margin:"0 4px"}}/>
      <div style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer",padding:"3px 7px",borderRadius:8,transition:"background 0.2s"}}
        onMouseEnter={e=>e.currentTarget.style.background=T.sl} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        <div style={{width:28,height:28,borderRadius:"50%",background:T.emD,border:`2px solid ${T.emB}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--head)",fontWeight:700,fontSize:10,color:T.em}}>UA</div>
        <div><div style={{fontFamily:"var(--head)",fontSize:11,fontWeight:600,color:"#fff"}}>Ugbefu Andrew</div><div style={{fontFamily:"var(--mono)",fontSize:8,color:T.gh}}>CEO · ADMIN</div></div>
      </div>
    </div>
  </header>;
};

/* ═══════════════════════════════════════
   PAGE 1: DASHBOARD
   ═══════════════════════════════════════ */
const DashPage = ({addToast}) => {
  const m=useMount();
  const md=useMemo(genMonthly,[]);
  const thru=useMemo(()=>genTS(24,210000,60000,2000),[]);
  const lat=useMemo(()=>genTS(24,14,8,-0.15),[]);
  const [tick,setTick]=useState(0);
  useEffect(()=>{const i=setInterval(()=>setTick(v=>v+1),4000);return()=>clearInterval(i);},[]);
  const txVol=useAnimNum(847000000000,1400,200);
  const channelData=[
    {name:"Bank Transfer",value:38,color:T.em},{name:"POS Terminal",value:24,color:T.bl},{name:"USSD",value:18,color:T.vt},{name:"Mobile Money",value:12,color:T.am},{name:"QR/Other",value:8,color:T.pk},
  ];
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11}}>
      <MC label="Daily Volume (₦)" value={fmtNGN(txVol)} change="+12.4%" dir="up" icon={Activity} d={0} show={m} sub="vs yesterday"/>
      <MC label="Avg Latency" value="13.2ms" change="-0.8ms" dir="up" icon={Zap} accent={T.bl} d={50} show={m} sub="NIBSS target: <20ms"/>
      <MC label="Fraud Blocked (₦)" value={fmtNGN(890000000)} change="+14 alerts" dir="down" icon={Shield} accent={T.rd} d={100} show={m} sub="CBN flagged: 6"/>
      <MC label="BVN Match Rate" value="97.8%" change="+0.3%" dir="up" icon={Fingerprint} accent={T.gn} d={150} show={m} sub="NIBSS verified"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"5fr 2fr",gap:11}}>
      <An d={220} show={m}>
        <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div><div style={{fontFamily:"var(--head)",fontWeight:600,fontSize:14,color:"#fff"}}>Platform Volume</div>
            <div style={{fontFamily:"var(--mono)",fontSize:10,color:T.gh,marginTop:1}}>Scoring · Fraud · Risk — Monthly (thousands)</div></div>
            <div style={{display:"flex",gap:4}}>
              {[{l:"Scoring",c:T.em},{l:"Risk",c:T.bl},{l:"Fraud",c:T.rd}].map(x=><div key={x.l} style={{display:"flex",alignItems:"center",gap:4,fontFamily:"var(--mono)",fontSize:9,color:T.mi}}><div style={{width:8,height:3,borderRadius:2,background:x.c}}/>{x.l}</div>)}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={md} barCategoryGap="16%">
              <CartesianGrid strokeDasharray="3 3" stroke={T.st} vertical={false}/>
              <XAxis dataKey="m" tick={{fill:T.gh,fontSize:10,fontFamily:"var(--mono)"}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:T.gh,fontSize:10,fontFamily:"var(--mono)"}} axisLine={false} tickLine={false} width={42}/>
              <Tooltip content={<Tip/>}/>
              <Bar dataKey="scoring" fill={T.em} radius={[3,3,0,0]} name="Scoring" isAnimationActive animationDuration={800}/>
              <Bar dataKey="risk" fill={T.bl} radius={[3,3,0,0]} name="Risk" isAnimationActive animationDuration={800}/>
              <Bar dataKey="fraud" fill={T.rd} radius={[3,3,0,0]} name="Fraud" isAnimationActive animationDuration={800}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </An>
      <div style={{display:"flex",flexDirection:"column",gap:11}}>
        <An d={280} show={m} s={{flex:1}}>
          <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:16,height:"100%"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span style={{fontFamily:"var(--mono)",fontSize:9.5,color:T.gh,letterSpacing:"0.06em",textTransform:"uppercase",fontWeight:600}}>NIBSS Throughput</span><Pulse size={5}/>
            </div>
            <div style={{fontFamily:"var(--head)",fontSize:22,fontWeight:700,color:"#fff"}}>210K<span style={{fontSize:11,color:T.mi}}> txn/sec</span></div>
            <Spark data={thru} color={T.em} h={48}/>
          </div>
        </An>
        <An d={340} show={m} s={{flex:1}}>
          <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:16,height:"100%"}}>
            <span style={{fontFamily:"var(--mono)",fontSize:9.5,color:T.gh,letterSpacing:"0.06em",textTransform:"uppercase",fontWeight:600}}>Channel Mix</span>
            <ResponsiveContainer width="100%" height={88}>
              <PieChart><Pie data={channelData} cx="50%" cy="50%" innerRadius={26} outerRadius={40} paddingAngle={3} dataKey="value" isAnimationActive animationDuration={900}>
                {channelData.map((d,i)=><Cell key={i} fill={d.color}/>)}
              </Pie></PieChart>
            </ResponsiveContainer>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {channelData.map(c=><div key={c.name} style={{display:"flex",alignItems:"center",gap:3,fontFamily:"var(--mono)",fontSize:8.5,color:T.mi}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:c.color}}/>{c.name} {c.value}%
              </div>)}
            </div>
          </div>
        </An>
      </div>
    </div>
    <An d={400} show={m}>
      <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontFamily:"var(--head)",fontWeight:600,fontSize:14,color:"#fff"}}>Recent Transactions</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}><Pulse size={5}/><span style={{fontFamily:"var(--mono)",fontSize:10,color:T.em}}>NIBSS FEED</span></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"80px 1.4fr 1fr 0.8fr 1fr 60px 65px",gap:0}}>
          {["Session","Entity","Channel","State","Amount (₦)","Risk","BVN"].map(h=><div key={h} style={{padding:"7px 8px",fontFamily:"var(--mono)",fontSize:9,fontWeight:600,color:T.gh,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${T.st}`}}>{h}</div>)}
          {TXS.slice(tick%8,tick%8+7).map((tx,i)=><div key={tx.id+i+tick} style={{display:"contents",animation:`fadeSlideIn 0.35s ease ${i*35}ms both`}}>
            <div style={{padding:"9px 8px",fontFamily:"var(--mono)",fontSize:10,color:T.mi,borderBottom:`1px solid ${T.st}06`}}>{tx.session.slice(-8)}</div>
            <div style={{padding:"9px 8px",fontFamily:"var(--head)",fontSize:12,fontWeight:500,color:"#fff",borderBottom:`1px solid ${T.st}06`}}>{tx.entity}</div>
            <div style={{padding:"9px 8px",fontFamily:"var(--body)",fontSize:11.5,color:T.sv,borderBottom:`1px solid ${T.st}06`}}>{tx.channel}</div>
            <div style={{padding:"9px 8px",fontFamily:"var(--mono)",fontSize:10,color:T.mi,borderBottom:`1px solid ${T.st}06`}}>{tx.state}</div>
            <div style={{padding:"9px 8px",fontFamily:"var(--mono)",fontSize:11,fontWeight:600,color:"#fff",borderBottom:`1px solid ${T.st}06`}}>₦{tx.amount.toLocaleString()}</div>
            <div style={{padding:"9px 8px",fontFamily:"var(--mono)",fontSize:10,fontWeight:600,borderBottom:`1px solid ${T.st}06`,color:tx.risk>0.7?T.rd:tx.risk>0.4?T.am:T.gn}}>{tx.risk.toFixed(3)}</div>
            <div style={{padding:"9px 8px",borderBottom:`1px solid ${T.st}06`}}><Badge c={tx.bvn==="Verified"?"gn":"rd"}>{tx.bvn==="Verified"?"✓ BVN":"✗ BVN"}</Badge></div>
          </div>)}
        </div>
      </div>
    </An>
  </div>;
};

/* ═══════════════════════════════════════
   PAGE 2: CREDIT SCORING (BVN/NIN)
   ═══════════════════════════════════════ */
const ScorePage = ({addToast}) => {
  const m=useMount();
  const [inc,setInc]=useState(65);const [dbt,setDbt]=useState(22);const [hist,setHist]=useState(72);const [util,setUtil]=useState(35);const [div,setDiv]=useState(58);
  const [bvnInput,setBvn]=useState("");const [verifying,setVerifying]=useState(false);const [verified,setVerified]=useState(null);
  const [anim,setAnim]=useState(0);
  const score=useMemo(()=>Math.round(300+((inc*0.2)+((100-dbt)*0.25)+(hist*0.3)+((100-util)*0.15)+(div*0.1))/100*550),[inc,dbt,hist,util,div]);
  useEffect(()=>{let r;const s=performance.now();const f=anim;const t=(n)=>{const p=Math.min((n-s)/600,1);setAnim(Math.round(f+(score-f)*(1-Math.pow(1-p,3))));if(p<1)r=requestAnimationFrame(t);};r=requestAnimationFrame(t);return()=>cancelAnimationFrame(r);},[score]);
  const sC=anim>=750?T.gn:anim>=650?T.em:anim>=550?T.am:T.rd;
  const sL=anim>=750?"Excellent":anim>=650?"Good":anim>=550?"Fair":"Poor";
  const rData=[{d:"Income",v:inc},{d:"Debt",v:100-dbt},{d:"History",v:hist},{d:"Util",v:100-util},{d:"Diversity",v:div}];
  const hData=useMemo(()=>Array.from({length:12},(_,i)=>({m:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",")[i],s:620+i*12+~~((Math.random()-0.3)*30)})),[]);

  const runBVN = () => {
    if(bvnInput.length!==11){addToast({type:"error",title:"Invalid BVN",msg:"BVN must be exactly 11 digits"});return;}
    setVerifying(true);setVerified(null);
    setTimeout(()=>{setVerifying(false);setVerified({name:"Adebayo Ogunlesi",bank:"GTBank",tier:"Tier 3",match:true,nin:"Linked",phone:"080••••••42"});
      addToast({type:"success",title:"BVN Verified",msg:`NIBSS match confirmed — ${bvnInput}`});
    },1500);
  };

  const Sl=({label,value,onChange,unit=""})=><div style={{marginBottom:14}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
      <span style={{fontFamily:"var(--head)",fontSize:11.5,fontWeight:500,color:T.sv}}>{label}</span>
      <span style={{fontFamily:"var(--mono)",fontSize:11,fontWeight:600,color:T.em}}>{value}{unit}</span>
    </div>
    <input type="range" min={0} max={100} value={value} onChange={e=>onChange(+e.target.value)} style={{width:"100%",accentColor:T.em,height:4,cursor:"pointer"}}/>
  </div>;

  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11}}>
      <MC label="BVN Scores Today" value="124,891" change="+8.2%" dir="up" icon={Fingerprint} d={0} show={m}/>
      <MC label="Avg Score" value="712" change="+4 pts" dir="up" icon={TrendingUp} accent={T.bl} d={50} show={m}/>
      <MC label="Default Rate" value="1.23%" change="-0.08%" dir="up" icon={Target} accent={T.gn} d={100} show={m}/>
      <MC label="NIN Linkage" value="94.6%" change="+1.1%" dir="up" icon={Users} accent={T.vt} d={150} show={m}/>
    </div>
    {/* BVN Lookup */}
    <An d={200} show={m}>
      <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:20}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <Fingerprint size={16} color={T.em}/>
          <span style={{fontFamily:"var(--head)",fontWeight:600,fontSize:14,color:"#fff"}}>BVN Verification Lookup</span>
          <Badge c="gn">NIBSS Connected</Badge>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"flex-end"}}>
          <div style={{flex:1}}>
            <label style={{fontFamily:"var(--mono)",fontSize:9.5,color:T.gh,letterSpacing:"0.06em",textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:5}}>Bank Verification Number</label>
            <input value={bvnInput} onChange={e=>setBvn(e.target.value.replace(/\D/g,"").slice(0,11))} placeholder="Enter 11-digit BVN..."
              style={{width:"100%",padding:"10px 14px",borderRadius:8,border:`1px solid ${T.st}`,background:T.sl,color:"#fff",fontFamily:"var(--mono)",fontSize:14,outline:"none",letterSpacing:"0.1em",transition:"border-color 0.2s"}}
              onFocus={e=>e.target.style.borderColor=T.em} onBlur={e=>e.target.style.borderColor=T.st}/>
          </div>
          <button onClick={runBVN} disabled={verifying}
            style={{padding:"10px 24px",borderRadius:8,background:verifying?T.am:T.em,color:T.nv,fontFamily:"var(--head)",fontWeight:600,fontSize:12,border:"none",cursor:verifying?"wait":"pointer",display:"flex",alignItems:"center",gap:6,transition:"all 0.25s",whiteSpace:"nowrap"}}>
            {verifying?<RefreshCw size={13} style={{animation:"spin 0.6s linear infinite"}}/>:<Search size={13}/>}
            {verifying?"Verifying via NIBSS...":"Verify BVN"}
          </button>
        </div>
        {verified&&<div style={{marginTop:14,padding:16,background:T.sl,borderRadius:10,border:`1px solid ${T.gnB}`,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,animation:"fadeSlideIn 0.4s ease"}}>
          {[{l:"Full Name",v:verified.name},{l:"Primary Bank",v:verified.bank},{l:"KYC Tier",v:verified.tier},{l:"BVN-NIN Match",v:verified.match?"✓ Linked":"✗ Unlinked"},{l:"NIN Status",v:verified.nin},{l:"Phone",v:verified.phone}].map(f=>
            <div key={f.l}><div style={{fontFamily:"var(--mono)",fontSize:9,color:T.gh,letterSpacing:"0.06em",textTransform:"uppercase",fontWeight:600,marginBottom:3}}>{f.l}</div>
            <div style={{fontFamily:"var(--head)",fontSize:13,fontWeight:600,color:"#fff"}}>{f.v}</div></div>
          )}
        </div>}
      </div>
    </An>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:11}}>
      <An d={300} show={m}>
        <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:20}}>
          <div style={{fontFamily:"var(--head)",fontWeight:600,fontSize:13,color:"#fff",marginBottom:3}}>Score Simulator</div>
          <div style={{fontFamily:"var(--mono)",fontSize:9.5,color:T.gh,marginBottom:16}}>CBN-compliant credit model parameters</div>
          <Sl label="Income Stability" value={inc} onChange={setInc}/>
          <Sl label="Debt-to-Income" value={dbt} onChange={setDbt} unit="%"/>
          <Sl label="Credit History (BVN)" value={hist} onChange={setHist}/>
          <Sl label="Credit Utilization" value={util} onChange={setUtil} unit="%"/>
          <Sl label="Account Diversification" value={div} onChange={setDiv}/>
        </div>
      </An>
      <An d={360} show={m}>
        <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:20,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontFamily:"var(--mono)",fontSize:9.5,color:T.gh,letterSpacing:"0.08em",textTransform:"uppercase",fontWeight:600,marginBottom:12}}>Kapix Credit Score</span>
          <div style={{position:"relative",width:160,height:160}}>
            <svg viewBox="0 0 160 160" style={{transform:"rotate(-90deg)"}}>
              <circle cx="80" cy="80" r="68" fill="none" stroke={T.st} strokeWidth="7"/>
              <circle cx="80" cy="80" r="68" fill="none" stroke={sC} strokeWidth="7" strokeDasharray={`${((anim-300)/550)*427} 427`} strokeLinecap="round" style={{transition:"stroke 0.4s",filter:`drop-shadow(0 0 10px ${sC}40)`}}/>
            </svg>
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <div style={{fontFamily:"var(--head)",fontSize:40,fontWeight:800,color:sC,lineHeight:1,transition:"color 0.4s"}}>{anim}</div>
              <div style={{fontFamily:"var(--mono)",fontSize:10,fontWeight:600,color:sC,marginTop:3}}>{sL}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:5,marginTop:14,width:"100%"}}>
            {[{l:"300",c:T.rd},{l:"550",c:T.am},{l:"650",c:T.em},{l:"750",c:T.gn},{l:"850",c:T.gn}].map((s,i)=>
              <div key={i} style={{flex:1,textAlign:"center"}}><div style={{height:3,background:s.c,borderRadius:2,opacity:0.4}}/><span style={{fontFamily:"var(--mono)",fontSize:8,color:T.gh}}>{s.l}</span></div>
            )}
          </div>
          <button onClick={()=>addToast({type:"success",title:"Report Generated",msg:`Credit assessment for score ${score} exported`})}
            style={{marginTop:16,padding:"8px 24px",borderRadius:8,background:T.em,color:T.nv,fontFamily:"var(--head)",fontWeight:600,fontSize:12,border:"none",cursor:"pointer",transition:"all 0.25s"}}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 4px 24px ${T.emG}`;e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>
            Generate CBN Report
          </button>
        </div>
      </An>
      <An d={420} show={m}>
        <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:20}}>
          <div style={{fontFamily:"var(--head)",fontWeight:600,fontSize:13,color:"#fff",marginBottom:3}}>Risk Dimensions</div>
          <div style={{fontFamily:"var(--mono)",fontSize:9.5,color:T.gh,marginBottom:4}}>Multi-factor BVN-linked analysis</div>
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart data={rData}><PolarGrid stroke={T.st}/><PolarAngleAxis dataKey="d" tick={{fill:T.mi,fontSize:10,fontFamily:"var(--mono)"}}/><PolarRadiusAxis tick={false} domain={[0,100]} axisLine={false}/><Radar dataKey="v" stroke={T.em} fill={T.em} fillOpacity={0.12} strokeWidth={2} isAnimationActive animationDuration={1000}/></RadarChart>
          </ResponsiveContainer>
        </div>
      </An>
    </div>
    <An d={480} show={m}>
      <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:20}}>
        <div style={{fontFamily:"var(--head)",fontWeight:600,fontSize:13,color:"#fff",marginBottom:12}}>Score Trend — 12 Month (BVN-linked entities)</div>
        <ResponsiveContainer width="100%" height={170}>
          <AreaChart data={hData}>
            <defs><linearGradient id="scG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.em} stopOpacity={0.2}/><stop offset="100%" stopColor={T.em} stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={T.st} vertical={false}/>
            <XAxis dataKey="m" tick={{fill:T.gh,fontSize:10,fontFamily:"var(--mono)"}} axisLine={false} tickLine={false}/>
            <YAxis domain={[550,850]} tick={{fill:T.gh,fontSize:10,fontFamily:"var(--mono)"}} axisLine={false} tickLine={false}/>
            <Tooltip content={<Tip/>}/>
            <Area type="monotone" dataKey="s" stroke={T.em} fill="url(#scG)" strokeWidth={2} dot={{r:3,fill:T.em}} name="Score" isAnimationActive animationDuration={1200}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </An>
  </div>;
};

/* ═══════════════════════════════════════
   PAGE 3: FRAUD CENTRE
   ═══════════════════════════════════════ */
const FraudPage = ({addToast}) => {
  const m=useMount();const [sel,setSel]=useState(null);const sevC={critical:T.rd,high:T.am,medium:T.vt,low:T.bl};
  const hourly=useMemo(()=>genTS(24,30,25),[]);
  const handleAction=(alert,action)=>{setSel(null);addToast({type:action==="Dismiss"||action==="Clear"?"success":"error",title:`${action}: ${alert.id}`,msg:`Action applied to ${alert.ent.split("—")[0].trim()}`});};
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11}}>
      <MC label="Active CBN Alerts" value="6" change="2 critical" dir="down" icon={AlertTriangle} accent={T.rd} d={0} show={m}/>
      <MC label="Blocked Today (₦)" value={fmtNGN(890000000)} change="+18%" dir="up" icon={Shield} accent={T.am} d={50} show={m}/>
      <MC label="False Positive Rate" value="2.8%" change="-0.4%" dir="up" icon={Target} d={100} show={m} sub="CBN benchmark: <5%"/>
      <MC label="Detection Speed" value="280ms" change="-18ms" dir="up" icon={Zap} accent={T.bl} d={150} show={m} sub="NIBSS round-trip"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1.1fr",gap:11}}>
      <An d={220} show={m}>
        <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,overflow:"hidden"}}>
          <div style={{padding:"14px 20px",borderBottom:`1px solid ${T.st}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontFamily:"var(--head)",fontWeight:600,fontSize:13,color:"#fff"}}>Live CBN/NIBSS Alerts</span>
            <div style={{display:"flex",alignItems:"center",gap:5}}><Pulse size={5} color={T.rd}/><Badge c="rd">6 Active</Badge></div>
          </div>
          <div style={{maxHeight:400,overflowY:"auto"}}>
            {ALERTS.map((a,i)=><div key={a.id} onClick={()=>setSel(sel===a.id?null:a.id)}
              style={{padding:"13px 20px",borderBottom:`1px solid ${T.st}06`,cursor:"pointer",transition:"all 0.2s",background:sel===a.id?T.sl:"transparent",animation:`fadeSlideIn 0.35s ease ${i*50+250}ms both`}}
              onMouseEnter={e=>{if(sel!==a.id)e.currentTarget.style.background=`${T.sl}90`;}} onMouseLeave={e=>{if(sel!==a.id)e.currentTarget.style.background="transparent";}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:sevC[a.sev],boxShadow:`0 0 10px ${sevC[a.sev]}50`,animation:a.sev==="critical"?"pulseRing 1.5s infinite":"none"}}/>
                <Badge c={a.sev==="critical"?"rd":a.sev==="high"?"am":a.sev==="medium"?"vt":"bl"}>{a.sev}</Badge>
                <span style={{fontFamily:"var(--mono)",fontSize:9,color:T.gh,marginLeft:"auto"}}>{a.time}</span>
              </div>
              <div style={{fontFamily:"var(--head)",fontSize:12.5,fontWeight:600,color:"#fff",marginBottom:2}}>{a.title}</div>
              <div style={{fontFamily:"var(--mono)",fontSize:10,color:T.mi}}>{a.ent} · {a.amt}</div>
              <div style={{maxHeight:sel===a.id?260:0,overflow:"hidden",transition:"max-height 0.4s cubic-bezier(0.16,1,0.3,1)"}}>
                <div style={{marginTop:11,padding:"13px 15px",background:T.st,borderRadius:8}}>
                  <p style={{fontFamily:"var(--body)",fontSize:12,color:T.sv,lineHeight:1.6,marginBottom:11}}>{a.detail}</p>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    {a.actions.map((btn,j)=><button key={btn} onClick={e=>{e.stopPropagation();handleAction(a,btn);}}
                      style={{padding:"5px 13px",borderRadius:6,background:j===0?T.rd:"transparent",color:j===0?"#fff":T.mi,border:j===0?"none":`1px solid ${T.st}`,fontFamily:"var(--head)",fontWeight:600,fontSize:10.5,cursor:"pointer",transition:"all 0.2s"}}
                      onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                      {btn}
                    </button>)}
                  </div>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </An>
      <div style={{display:"flex",flexDirection:"column",gap:11}}>
        <An d={300} show={m}>
          <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:20}}>
            <div style={{fontFamily:"var(--head)",fontWeight:600,fontSize:13,color:"#fff",marginBottom:12}}>Anomaly Volume — 24h (NIBSS flagged)</div>
            <ResponsiveContainer width="100%" height={170}>
              <AreaChart data={hourly}>
                <defs><linearGradient id="fG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.rd} stopOpacity={0.2}/><stop offset="100%" stopColor={T.rd} stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke={T.st} vertical={false}/>
                <XAxis dataKey="t" tick={{fill:T.gh,fontSize:9,fontFamily:"var(--mono)"}} axisLine={false} tickLine={false} interval={3}/>
                <YAxis tick={{fill:T.gh,fontSize:9,fontFamily:"var(--mono)"}} axisLine={false} tickLine={false}/>
                <Tooltip content={<Tip/>}/>
                <Area type="monotone" dataKey="v" stroke={T.rd} fill="url(#fG)" strokeWidth={2} name="Anomalies" isAnimationActive animationDuration={1000}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </An>
        <An d={370} show={m}>
          <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:20}}>
            <div style={{fontFamily:"var(--head)",fontWeight:600,fontSize:13,color:"#fff",marginBottom:12}}>Fraud by Channel</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {[{l:"POS",n:42,c:T.rd,icon:"📟"},{l:"USSD",n:28,c:T.am,icon:"📱"},{l:"NIP",n:18,c:T.vt,icon:"🏦"},{l:"Card",n:8,c:T.bl,icon:"💳"},{l:"Mobile",n:3,c:T.gn,icon:"📲"},{l:"QR",n:1,c:T.mi,icon:"📷"}].map((s,i)=>
                <div key={s.l} style={{textAlign:"center",padding:12,background:T.sl,borderRadius:9,border:`1px solid ${T.st}`,animation:`scaleIn 0.35s ease ${i*60+400}ms both`}}>
                  <div style={{fontSize:16,marginBottom:4}}>{s.icon}</div>
                  <div style={{fontFamily:"var(--head)",fontSize:20,fontWeight:700,color:s.c}}>{s.n}%</div>
                  <div style={{fontFamily:"var(--mono)",fontSize:8.5,color:T.gh,marginTop:2,textTransform:"uppercase",letterSpacing:"0.05em"}}>{s.l}</div>
                </div>
              )}
            </div>
          </div>
        </An>
      </div>
    </div>
  </div>;
};

/* ═══════════════════════════════════════
   PAGE 4: RISK (Localized sectors)
   ═══════════════════════════════════════ */
const RiskPage = () => {
  const m=useMount();const rData=useMemo(()=>genTS(30,0.35,0.2,-0.003),[]);
  const sectors=[
    {s:"Banking (Tier 1)",e:32,r:0.24},{s:"Fintech/MFB",e:24,r:0.52},{s:"Oil & Gas",e:16,r:0.44},
    {s:"Agribusiness",e:12,r:0.38},{s:"Telecoms",e:10,r:0.28},{s:"Crypto/OTC",e:6,r:0.78},
  ];
  const zones=[
    {name:"South-West (Lagos)",value:42,color:T.em},{name:"North-Central (Abuja)",value:22,color:T.bl},
    {name:"South-South (PH)",value:14,color:T.vt},{name:"North-West",value:10,color:T.am},{name:"South-East",value:8,color:T.pk},{name:"North-East",value:4,color:T.mi},
  ];
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11}}>
      <MC label="Portfolio VaR (95%)" value={fmtNGN(6800000000)} change="-₦420M" dir="up" icon={TrendingUp} d={0} show={m}/>
      <MC label="Concentration (HHI)" value="0.29" change="-0.03" dir="up" icon={PieIcon} accent={T.bl} d={50} show={m}/>
      <MC label="Avg Risk Score" value="0.32" change="-0.02" dir="up" icon={Target} accent={T.gn} d={100} show={m} sub="Low-moderate"/>
      <MC label="CBN Stress Pass" value="98.4%" change="+1.2%" dir="up" icon={Shield} d={150} show={m} sub="Basel III aligned"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1.3fr 1fr",gap:11}}>
      <An d={220} show={m}>
        <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:20}}>
          <div style={{fontFamily:"var(--head)",fontWeight:600,fontSize:13,color:"#fff",marginBottom:12}}>Portfolio Risk — 30 Day</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={rData}>
              <defs><linearGradient id="rG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.em} stopOpacity={0.2}/><stop offset="100%" stopColor={T.em} stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.st} vertical={false}/>
              <XAxis dataKey="t" tick={{fill:T.gh,fontSize:9,fontFamily:"var(--mono)"}} axisLine={false} tickLine={false} interval={4}/>
              <YAxis domain={[0,1]} tick={{fill:T.gh,fontSize:9,fontFamily:"var(--mono)"}} axisLine={false} tickLine={false}/>
              <Tooltip content={<Tip/>}/>
              <Area type="monotone" dataKey="v" stroke={T.em} fill="url(#rG)" strokeWidth={2} name="Risk Score" isAnimationActive animationDuration={1200}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </An>
      <An d={300} show={m}>
        <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:20}}>
          <div style={{fontFamily:"var(--head)",fontWeight:600,fontSize:13,color:"#fff",marginBottom:12}}>Geopolitical Zone Exposure</div>
          <ResponsiveContainer width="100%" height={160}><PieChart><Pie data={zones} cx="50%" cy="50%" innerRadius={44} outerRadius={68} paddingAngle={3} dataKey="value" isAnimationActive animationDuration={900}>{zones.map((d,i)=><Cell key={i} fill={d.color}/>)}</Pie><Tooltip content={<Tip/>}/></PieChart></ResponsiveContainer>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:6}}>
            {zones.map(r=><div key={r.name} style={{display:"flex",alignItems:"center",gap:3,fontFamily:"var(--mono)",fontSize:8.5,color:T.mi}}><div style={{width:5,height:5,borderRadius:"50%",background:r.color}}/>{r.name} {r.value}%</div>)}
          </div>
        </div>
      </An>
    </div>
    <An d={380} show={m}>
      <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:20}}>
        <div style={{fontFamily:"var(--head)",fontWeight:600,fontSize:13,color:"#fff",marginBottom:12}}>Sector Exposure Matrix (CBN Classification)</div>
        <div style={{display:"grid",gridTemplateColumns:"140px 1fr 70px 90px",gap:0}}>
          {["Sector","Exposure","Risk","CBN Status"].map(h=><div key={h} style={{padding:"7px 10px",fontFamily:"var(--mono)",fontSize:9,fontWeight:600,color:T.gh,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${T.st}`}}>{h}</div>)}
          {sectors.map((s,i)=><div key={s.s} style={{display:"contents",animation:`fadeSlideIn 0.35s ease ${i*50+450}ms both`}}>
            <div style={{padding:"12px 10px",fontFamily:"var(--head)",fontSize:12.5,fontWeight:500,color:"#fff",borderBottom:`1px solid ${T.st}06`}}>{s.s}</div>
            <div style={{padding:"12px 10px",borderBottom:`1px solid ${T.st}06`,display:"flex",alignItems:"center",gap:10}}>
              <div style={{flex:1,height:5,background:T.st,borderRadius:3,overflow:"hidden"}}><div style={{width:`${s.e}%`,height:"100%",background:T.em,borderRadius:3,animation:`barGrow 0.8s ease ${i*70+500}ms both`}}/></div>
              <span style={{fontFamily:"var(--mono)",fontSize:10,color:T.mi,minWidth:28,textAlign:"right"}}>{s.e}%</span>
            </div>
            <div style={{padding:"12px 10px",fontFamily:"var(--mono)",fontSize:11,fontWeight:600,borderBottom:`1px solid ${T.st}06`,color:s.r>0.6?T.rd:s.r>0.4?T.am:T.gn}}>{s.r.toFixed(2)}</div>
            <div style={{padding:"12px 10px",borderBottom:`1px solid ${T.st}06`}}><Badge c={s.r>0.6?"rd":s.r>0.4?"am":"gn"}>{s.r>0.6?"High Risk":s.r>0.4?"Watchlist":"Compliant"}</Badge></div>
          </div>)}
        </div>
      </div>
    </An>
  </div>;
};

/* ═══════════════════════════════════════
   PAGE 5: TRANSACTIONS (Localized)
   ═══════════════════════════════════════ */
const TxnsPage = () => {
  const m=useMount();const [filter,setFilter]=useState("all");const [search,setSearch]=useState("");const [pg,setPg]=useState(0);const pp=12;
  const filtered=useMemo(()=>{let f=TXS;if(filter!=="all")f=f.filter(t=>t.status===filter);if(search)f=f.filter(t=>t.entity.toLowerCase().includes(search.toLowerCase())||t.id.toLowerCase().includes(search.toLowerCase())||t.bank.toLowerCase().includes(search.toLowerCase()));return f;},[filter,search]);
  const paged=filtered.slice(pg*pp,(pg+1)*pp);const tp=Math.ceil(filtered.length/pp);
  const tabs=[{id:"all",l:"All"},{id:"approved",l:"Approved"},{id:"flagged",l:"Flagged"},{id:"declined",l:"Declined"},{id:"pending",l:"Pending"}];
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11}}>
      <MC label="Daily Volume (₦)" value={fmtNGN(847000000000)} change="+14.2%" dir="up" icon={Activity} d={0} show={m}/>
      <MC label="NIP Success Rate" value="99.2%" icon={CheckCircle} accent={T.gn} d={50} show={m} sub="NIBSS benchmark"/>
      <MC label="Flagged (₦)" value={fmtNGN(2400000000)} icon={AlertTriangle} accent={T.am} d={100} show={m}/>
      <MC label="POS Decline Rate" value="1.4%" icon={Smartphone} accent={T.rd} d={150} show={m}/>
    </div>
    <An d={220} show={m}>
      <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,overflow:"hidden"}}>
        <div style={{padding:"13px 20px",borderBottom:`1px solid ${T.st}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",gap:3}}>
            {tabs.map(t=><button key={t.id} onClick={()=>{setFilter(t.id);setPg(0);}}
              style={{padding:"5px 11px",borderRadius:6,border:"none",cursor:"pointer",fontFamily:"var(--head)",fontSize:11.5,fontWeight:filter===t.id?600:500,background:filter===t.id?T.emD:"transparent",color:filter===t.id?T.em:T.mi,transition:"all 0.2s"}}>{t.l}</button>)}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:7,background:T.sl,borderRadius:8,padding:"0 10px",border:`1px solid ${T.st}`}}>
            <Search size={12} color={T.gh}/>
            <input value={search} onChange={e=>{setSearch(e.target.value);setPg(0);}} placeholder="Search entity, bank, KPX ID..." style={{border:"none",background:"transparent",color:"#fff",fontFamily:"var(--body)",fontSize:12.5,padding:"7px 0",outline:"none",width:200}}/>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"75px 1.4fr 0.9fr 0.7fr 0.9fr 55px 60px 60px",gap:0}}>
          {["KPX ID","Entity","Channel","State","Amount (₦)","Risk","BVN","Bank"].map(h=><div key={h} style={{padding:"8px 8px",fontFamily:"var(--mono)",fontSize:8.5,fontWeight:600,color:T.gh,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${T.st}`,background:T.sl}}>{h}</div>)}
          {paged.map((tx,i)=><div key={tx.id+pg} style={{display:"contents",animation:`fadeSlideIn 0.3s ease ${i*25}ms both`}}>
            <div style={{padding:"9px 8px",fontFamily:"var(--mono)",fontSize:10,color:T.mi,borderBottom:`1px solid ${T.st}06`}}>{tx.id}</div>
            <div style={{padding:"9px 8px",fontFamily:"var(--head)",fontSize:11.5,fontWeight:500,color:"#fff",borderBottom:`1px solid ${T.st}06`,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{tx.entity}</div>
            <div style={{padding:"9px 8px",fontFamily:"var(--body)",fontSize:11,color:T.sv,borderBottom:`1px solid ${T.st}06`}}>{tx.channel}</div>
            <div style={{padding:"9px 8px",fontFamily:"var(--mono)",fontSize:9.5,color:T.mi,borderBottom:`1px solid ${T.st}06`}}>{tx.state}</div>
            <div style={{padding:"9px 8px",fontFamily:"var(--mono)",fontSize:10.5,fontWeight:600,color:"#fff",borderBottom:`1px solid ${T.st}06`}}>₦{tx.amount.toLocaleString()}</div>
            <div style={{padding:"9px 8px",fontFamily:"var(--mono)",fontSize:10,fontWeight:600,borderBottom:`1px solid ${T.st}06`,color:tx.risk>0.7?T.rd:tx.risk>0.4?T.am:T.gn}}>{tx.risk.toFixed(2)}</div>
            <div style={{padding:"9px 8px",borderBottom:`1px solid ${T.st}06`}}><Badge c={tx.bvn==="Verified"?"gn":"rd"}>{tx.bvn==="Verified"?"✓":"✗"}</Badge></div>
            <div style={{padding:"9px 8px",fontFamily:"var(--mono)",fontSize:8.5,color:T.mi,borderBottom:`1px solid ${T.st}06`,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{tx.bank}</div>
          </div>)}
        </div>
        <div style={{padding:"11px 20px",borderTop:`1px solid ${T.st}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontFamily:"var(--mono)",fontSize:10,color:T.gh}}>{pg*pp+1}–{Math.min((pg+1)*pp,filtered.length)} of {filtered.length}</span>
          <div style={{display:"flex",gap:3}}>{[...Array(Math.min(tp,6))].map((_,i)=>
            <button key={i} onClick={()=>setPg(i)} style={{width:26,height:26,borderRadius:6,border:`1px solid ${pg===i?T.em:T.st}`,background:pg===i?T.emD:"transparent",color:pg===i?T.em:T.mi,cursor:"pointer",fontFamily:"var(--mono)",fontSize:10,fontWeight:600,transition:"all 0.2s"}}>{i+1}</button>
          )}</div>
        </div>
      </div>
    </An>
  </div>;
};

/* ═══════════════════════════════════════
   PAGE 6: API CONSOLE (Localized)
   ═══════════════════════════════════════ */
const APIPage = ({addToast}) => {
  const m=useMount();const [cp,setCp]=useState(null);const [ae,setAe]=useState(0);const [run,setRun]=useState(false);const [showR,setShowR]=useState(true);
  const copy=(t,id)=>{navigator.clipboard?.writeText(t);setCp(id);setTimeout(()=>setCp(null),2000);addToast({type:"success",title:"Copied",msg:"Content copied to clipboard"});};
  const eps=[
    {mt:"POST",path:"/v1/bvn/score",l:"BVN Score",d:"BVN-linked credit assessment",
      req:`curl -X POST https://api.kapix.ai/v1/bvn/score \\
  -H "Authorization: Bearer kpx_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "bvn": "22312345678",
    "data_sources": ["nibss","credit_bureau","telco"],
    "options": { "explain": true, "nin_link": true }
  }'`,
      res:`{
  "bvn": "22312345678",
  "score": 742,
  "band": "good",
  "confidence": 0.94,
  "nin_linked": true,
  "kyc_tier": "tier_3",
  "bank": "GTBank",
  "factors": [
    { "dim": "repayment_history", "impact": +82 },
    { "dim": "account_activity", "impact": +56 },
    { "dim": "telco_behaviour", "impact": -14 }
  ],
  "latency_ms": 11,
  "model": "kapix-bvn-score-v4.2"
}`},
    {mt:"POST",path:"/v1/fraud/detect",l:"Fraud Detect",d:"NIP/POS/USSD fraud analysis",
      req:`curl -X POST https://api.kapix.ai/v1/fraud/detect \\
  -H "Authorization: Bearer kpx_live_..." \\
  -d '{
    "session_id": "NIBSS-884210",
    "channel": "nip",
    "amount": 28400000,
    "currency": "NGN",
    "sender_bvn": "22312345678",
    "receiver_bank": "044"
  }'`,
      res:`{
  "session_id": "NIBSS-884210",
  "fraud_probability": 0.87,
  "classification": "high_risk",
  "signals": [
    "bvn_mismatch",
    "cbn_threshold_exceeded",
    "new_beneficiary_corridor"
  ],
  "recommendation": "block",
  "cbn_report_required": true,
  "latency_ms": 8
}`},
    {mt:"GET",path:"/v1/risk/portfolio",l:"Portfolio Risk",d:"CBN-compliant risk surface",
      req:`curl https://api.kapix.ai/v1/risk/portfolio \\
  -H "Authorization: Bearer kpx_live_..." \\
  -G -d "portfolio_id=PF-NG-001" \\
     -d "metrics=var,cvar,hhi" \\
     -d "cbn_stress=true"`,
      res:`{
  "portfolio_id": "PF-NG-001",
  "var_95_ngn": 6800000000,
  "cvar_95_ngn": 8200000000,
  "concentration_hhi": 0.29,
  "cbn_stress_test": "pass",
  "basel_iii_aligned": true,
  "top_exposure": "banking_tier1",
  "timestamp": "2026-03-30T14:22:01+01:00"
}`},
  ];
  const ep=eps[ae];
  const handleRun=()=>{setRun(true);setShowR(false);setTimeout(()=>{setShowR(true);setRun(false);addToast({type:"success",title:"API Response",msg:`${ep.mt} ${ep.path} — 200 OK in 11ms`});},1200);};
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:11}}>
      <MC label="API Calls Today" value="2.4M" change="+18%" dir="up" icon={Wifi} d={0} show={m}/>
      <MC label="NIBSS Round-trip" value="11ms" change="-1ms" dir="up" icon={Zap} accent={T.bl} d={50} show={m}/>
      <MC label="Error Rate" value="0.02%" change="-0.01%" dir="up" icon={Server} accent={T.gn} d={100} show={m}/>
    </div>
    <An d={180} show={m}>
      <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,padding:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontFamily:"var(--head)",fontWeight:600,fontSize:13,color:"#fff",marginBottom:3,display:"flex",alignItems:"center",gap:7}}>API Key <Lock size={11} color={T.gh}/> <Badge c="gn">Production</Badge></div>
        <div style={{fontFamily:"var(--mono)",fontSize:13,color:T.mi,letterSpacing:"0.05em"}}>kpx_live_ng_••••••••••••4f2a</div></div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>copy("kpx_live_ng_sk_a8c3f1d9e7b2406584f2a","key")} style={{padding:"7px 15px",borderRadius:7,border:`1px solid ${T.st}`,background:"transparent",color:T.mi,cursor:"pointer",fontFamily:"var(--head)",fontSize:11,fontWeight:500,display:"flex",alignItems:"center",gap:5,transition:"all 0.2s"}}>
            {cp==="key"?<Check size={11} color={T.gn}/>:<Copy size={11}/>}{cp==="key"?"Copied!":"Copy"}
          </button>
          <button style={{padding:"7px 15px",borderRadius:7,background:T.em,color:T.nv,cursor:"pointer",fontFamily:"var(--head)",fontSize:11,fontWeight:600,border:"none",transition:"all 0.25s"}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 4px 20px ${T.emG}`} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>Regenerate</button>
        </div>
      </div>
    </An>
    <div style={{display:"grid",gridTemplateColumns:"250px 1fr",gap:11}}>
      <An d={250} show={m}>
        <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,overflow:"hidden"}}>
          <div style={{padding:"13px 16px",borderBottom:`1px solid ${T.st}`,fontFamily:"var(--head)",fontWeight:600,fontSize:12,color:"#fff"}}>Endpoints</div>
          {eps.map((e,i)=><button key={i} onClick={()=>{setAe(i);setShowR(true);}}
            style={{width:"100%",padding:"12px 16px",border:"none",borderBottom:`1px solid ${T.st}06`,cursor:"pointer",textAlign:"left",background:i===ae?T.sl:"transparent",transition:"all 0.2s",position:"relative"}}
            onMouseEnter={ev=>{if(i!==ae)ev.currentTarget.style.background=`${T.sl}80`;}} onMouseLeave={ev=>{if(i!==ae)ev.currentTarget.style.background="transparent";}}>
            {i===ae&&<div style={{position:"absolute",left:0,top:0,bottom:0,width:2.5,background:T.em,animation:"slideInLeft 0.2s ease"}}/>}
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}><Badge c={e.mt==="POST"?"em":"bl"}>{e.mt}</Badge><span style={{fontFamily:"var(--mono)",fontSize:10.5,color:i===ae?"#fff":T.mi}}>{e.path}</span></div>
            <div style={{fontFamily:"var(--body)",fontSize:11,color:T.gh}}>{e.d}</div>
          </button>)}
        </div>
      </An>
      <div style={{display:"flex",flexDirection:"column",gap:11}}>
        <An d={320} show={m}>
          <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,overflow:"hidden"}}>
            <div style={{padding:"11px 16px",borderBottom:`1px solid ${T.st}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:"var(--head)",fontWeight:600,fontSize:12,color:"#fff"}}>Request</span>
              <div style={{display:"flex",gap:5}}>
                <button onClick={handleRun} disabled={run}
                  style={{padding:"4px 12px",borderRadius:6,background:run?T.am:T.em,color:T.nv,fontFamily:"var(--head)",fontWeight:600,fontSize:10.5,border:"none",cursor:run?"wait":"pointer",display:"flex",alignItems:"center",gap:4,transition:"all 0.25s"}}>
                  {run?<RefreshCw size={10} style={{animation:"spin 0.6s linear infinite"}}/>:<ArrowRight size={10}/>}{run?"Running...":"Send Request"}
                </button>
                <button onClick={()=>copy(ep.req,"req")} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${T.st}`,background:"transparent",color:T.gh,cursor:"pointer",display:"flex",alignItems:"center",fontFamily:"var(--mono)",fontSize:10}}>
                  {cp==="req"?<Check size={10} color={T.gn}/>:<Copy size={10}/>}
                </button>
              </div>
            </div>
            <pre style={{padding:16,margin:0,fontFamily:"var(--mono)",fontSize:11,color:T.sv,lineHeight:1.7,overflowX:"auto",background:T.nv,maxHeight:190}}>{ep.req}</pre>
          </div>
        </An>
        <An d={390} show={m}>
          <div style={{background:T.gr,border:`1px solid ${T.st}`,borderRadius:14,overflow:"hidden"}}>
            <div style={{padding:"11px 16px",borderBottom:`1px solid ${T.st}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                <span style={{fontFamily:"var(--head)",fontWeight:600,fontSize:12,color:"#fff"}}>Response</span>
                {showR&&<Badge c="gn">200 OK</Badge>}
                {showR&&<span style={{fontFamily:"var(--mono)",fontSize:9.5,color:T.gh}}>11ms</span>}
              </div>
              <button onClick={()=>copy(ep.res,"res")} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${T.st}`,background:"transparent",color:T.gh,cursor:"pointer",display:"flex",alignItems:"center",fontFamily:"var(--mono)",fontSize:10}}>
                {cp==="res"?<Check size={10} color={T.gn}/>:<Copy size={10}/>}
              </button>
            </div>
            <div style={{position:"relative",minHeight:170}}>
              {!showR&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:T.nv,zIndex:2}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                  <div style={{width:22,height:22,border:`2px solid ${T.st}`,borderTopColor:T.em,borderRadius:"50%",animation:"spin 0.6s linear infinite"}}/>
                  <span style={{fontFamily:"var(--mono)",fontSize:10,color:T.gh}}>Querying NIBSS...</span>
                </div>
              </div>}
              <pre style={{padding:16,margin:0,fontFamily:"var(--mono)",fontSize:11,color:T.em,lineHeight:1.7,overflowX:"auto",background:T.nv,opacity:showR?1:0,transition:"opacity 0.3s",maxHeight:250}}>{ep.res}</pre>
            </div>
          </div>
        </An>
      </div>
    </div>
  </div>;
};

/* ═══════════════════════════════════════
   MAIN APP SHELL
   ═══════════════════════════════════════ */
export default function KapixNG() {
  const [page,setPage]=useState("dash");
  const [col,setCol]=useState(false);
  const [pageKey,setPK]=useState(0);
  const [cmdOpen,setCmd]=useState(false);
  const [toasts,setToasts]=useState([]);
  const addToast=useCallback((t)=>{const id=Date.now();setToasts(v=>[...v,{...t,id}]);setTimeout(()=>setToasts(v=>v.filter(x=>x.id!==id)),4000);},[]);
  const dismiss=useCallback((id)=>setToasts(v=>v.filter(x=>x.id!==id)),[]);
  const nav=(p)=>{setPage(p);setPK(k=>k+1);};

  useEffect(()=>{
    const h=(e)=>{if((e.metaKey||e.ctrlKey)&&e.key==="k"){e.preventDefault();setCmd(v=>!v);}if(e.key==="Escape")setCmd(false);};
    window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);
  },[]);

  const pages={dash:DashPage,score:ScorePage,fraud:FraudPage,risk:RiskPage,txns:TxnsPage,api:APIPage};
  const P=pages[page];
  return <div style={{display:"flex",height:"100vh",background:T.nv,color:"#fff",fontFamily:"var(--body)"}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Anybody:wght@300;400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600&family=JetBrains+Mono:wght@400;500;600&display=swap');
      :root{--head:'Anybody',sans-serif;--body:'Newsreader',Georgia,serif;--mono:'JetBrains Mono',monospace;}
      *{margin:0;padding:0;box-sizing:border-box;}
      ::-webkit-scrollbar{width:5px;height:5px;}
      ::-webkit-scrollbar-track{background:transparent;}
      ::-webkit-scrollbar-thumb{background:${T.st};border-radius:3px;}
      ::-webkit-scrollbar-thumb:hover{background:${T.gh};}
      input[type="range"]{-webkit-appearance:none;background:${T.st};border-radius:4px;outline:none;}
      input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:${T.em};cursor:pointer;border:2px solid ${T.nv};box-shadow:0 0 8px ${T.emG};}
      @keyframes pulseRing{0%,100%{transform:scale(1);opacity:0.3}50%{transform:scale(2);opacity:0}}
      @keyframes fadeSlideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      @keyframes slideInLeft{from{transform:scaleY(0)}to{transform:scaleY(1)}}
      @keyframes dropIn{from{opacity:0;transform:translateY(-8px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
      @keyframes shimmer{from{opacity:0;transform:translateX(-100%)}to{opacity:1;transform:translateX(100%)}}
      @keyframes barGrow{from{width:0}}
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes pageEnter{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes cmdIn{from{opacity:0;transform:translateY(-12px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes toastIn{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}
    `}</style>
    <Side active={page} onNav={nav} col={col} onCol={()=>setCol(!col)}/>
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <TopBar page={page} onCmd={()=>setCmd(true)} toastCount={ALERTS.length}/>
      <main key={pageKey} style={{flex:1,overflow:"auto",padding:20,animation:"pageEnter 0.4s cubic-bezier(0.16,1,0.3,1)"}}>
        <P addToast={addToast}/>
      </main>
    </div>
    <CmdPalette open={cmdOpen} onClose={()=>setCmd(false)} onNav={nav}/>
    <ToastCtx toasts={toasts} dismiss={dismiss}/>
  </div>;
}
