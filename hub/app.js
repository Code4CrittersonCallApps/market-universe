const CG={BTC:'bitcoin',ETH:'ethereum'},ALTS={XRP:'ripple',SOL:'solana',ADA:'cardano',DOGE:'dogecoin',LINK:'chainlink'};
const failed=new Set(),st=t=>document.getElementById('status').textContent=t;
const $=id=>document.getElementById(id);
async function cached(key,ttlMin,fn){try{const c=JSON.parse(localStorage.getItem(key)||'null');if(c&&Date.now()-c.t<ttlMin*6e4)return c.d}catch(e){}
 try{const d=await fn();localStorage.setItem(key,JSON.stringify({t:Date.now(),d}));return d}catch(e){const c=JSON.parse(localStorage.getItem(key)||'null');if(c)return c.d;throw e}}
async function getJ(u){const r=await fetch(u);if(r.status===429)throw new Error('rate-limited');if(!r.ok)throw new Error(r.status);return r.json()}
async function daily(sym){return cached('d_'+sym,30,async()=>{
 try{const j=await getJ(`https://api.coingecko.com/api/v3/coins/${CG[sym]}/market_chart?vs_currency=usd&days=365&interval=daily`);
  return {src:'CoinGecko',bars:j.prices.map((p,i)=>({time:Math.floor(p[0]/1e3/86400)*86400,close:p[1],vol:(j.total_volumes[i]||[0,0])[1]}))}}
 catch(e){failed.add('CoinGecko market_chart ('+e.message+')')}
 try{let all=[];for(const back of [0,300]){const end=new Date(Date.now()-back*864e5),start=new Date(end-299*864e5);
  const j=await getJ(`https://api.exchange.coinbase.com/products/${sym}-USD/candles?granularity=86400&start=${start.toISOString()}&end=${end.toISOString()}`);all=all.concat(j)}
  all.sort((a,b)=>a[0]-b[0]);return {src:'Coinbase',bars:all.filter((x,i,a)=>!i||x[0]!==a[i-1][0]).slice(-365).map(c=>({time:c[0],close:c[4],vol:c[5]*c[4]}))}}
 catch(e){failed.add('Coinbase daily ('+e.message+')')}
 const j=await getJ(`https://api.binance.com/api/v3/klines?symbol=${sym}USDT&interval=1d&limit=365`);return {src:'Binance',bars:j.map(k=>({time:k[0]/1e3,close:+k[4],vol:+k[7]}))}})}
async function hourly(sym){return cached('h_'+sym,10,async()=>{try{const j=await getJ(`https://api.exchange.coinbase.com/products/${sym}-USD/candles?granularity=3600`);
 return j.sort((a,b)=>a[0]-b[0]).map(c=>({time:c[0],low:c[1],high:c[2],open:c[3],close:c[4]}))}catch(e){failed.add('Coinbase hourly ('+e.message+')');
 const k=await getJ(`https://api.binance.com/api/v3/klines?symbol=${sym}USDT&interval=1h&limit=300`);return k.map(x=>({time:x[0]/1e3,open:+x[1],high:+x[2],low:+x[3],close:+x[4]}))}})}
const sma=(a,n)=>a.map((_,i)=>i<n-1?null:a.slice(i-n+1,i+1).reduce((s,x)=>s+x,0)/n);
function rsi(a,n=14){let g=0,l=0;for(let i=1;i<=n;i++){const d=a[i]-a[i-1];d>0?g+=d:l-=d}g/=n;l/=n;
 for(let i=n+1;i<a.length;i++){const d=a[i]-a[i-1];g=(g*(n-1)+Math.max(d,0))/n;l=(l*(n-1)+Math.max(-d,0))/n}return 100-100/(1+g/(l||1e-9))}
function pivots(v,w){const hi=[],lo=[];for(let i=w;i<v.length-w;i++){const s=v.slice(i-w,i+w+1);if(v[i]===Math.max(...s))hi.push(v[i]);if(v[i]===Math.min(...s))lo.push(v[i])}return{hi,lo}}
function cluster(levels,tol){const out=[];levels.sort((a,b)=>a-b).forEach(x=>{const c=out.find(o=>Math.abs(o.p-x)/x<tol);c?(c.p=(c.p*c.n+x)/(c.n+1),c.n++):out.push({p:x,n:1})});return out.sort((a,b)=>b.n-a.n)}
const fmt=x=>x==null?'–':'$'+(x>=100?Math.round(x).toLocaleString():x.toFixed(4));
let charts={},D=null,ext={};
function mk(id,h){if(charts[id])charts[id].remove();const el=$(id);const c=LightweightCharts.createChart(el,{height:h||380,width:el.clientWidth||600,layout:{background:{color:'#0f1419'},textColor:'#ccc'},grid:{vertLines:{color:'#1c2533'},horzLines:{color:'#1c2533'}},timeScale:{timeVisible:true}});charts[id]=c;return c}
function line(c,data,color,w=2,style=0){const s=c.addLineSeries({color,lineWidth:w,lineStyle:style,priceLineVisible:false,lastValueVisible:false});s.setData(data);return s}
function hline(s,p,color,title,style=2){s.createPriceLine({price:p,color,lineWidth:1,lineStyle:style,axisLabelVisible:true,title})}

async function loadExt(){
 try{ext.g=await cached('global',30,()=>getJ('https://api.coingecko.com/api/v3/global'))}catch(e){failed.add('CoinGecko global/dominance ('+e.message+')')}
 try{ext.f=await cached('fng',60,()=>getJ('https://api.alternative.me/fng/?limit=1'))}catch(e){failed.add('alternative.me Fear&Greed ('+e.message+')')}
 try{ext.fund=await cached('fund',30,async()=>{const r={};for(const s of['BTC','ETH']){const j=await getJ(`https://www.okx.com/api/v5/public/funding-rate?instId=${s}-USDT-SWAP`);r[s]=+j.data[0].fundingRate}return r})}catch(e){failed.add('OKX funding rate ('+e.message+')')}}

async function render(){const sym=$('asset').value;st('loading '+sym+'…');
 try{D=await daily(sym);const m=new Map();D.bars.forEach(x=>m.set(x.time,x));D.bars=[...m.values()].sort((a,b)=>a.time-b.time)}catch(e){st('all daily sources failed: '+e.message);return}
 const b=D.bars,c=b.map(x=>x.close),last=c.at(-1),m50=sma(c,50),m200=sma(c,200),r=rsi(c);
 const sw=c.slice(-180),H=Math.max(...sw),L=Math.min(...sw),hiI=sw.indexOf(H),loI=sw.indexOf(L),up=loI<hiI;
 const fibs=[0.236,0.382,0.5,0.618,0.786].map(f=>({f,p:up?H-(H-L)*f:L+(H-L)*f}));
 const pv=pivots(c,5),lv=cluster(pv.hi.concat(pv.lo),0.03).slice(0,8),sup=lv.filter(x=>x.p<last).sort((a,b)=>b.p-a.p)[0],res=lv.filter(x=>x.p>last).sort((a,b)=>a.p-b.p)[0];
 const v20=b.slice(-20).reduce((s,x)=>s+x.vol,0)/20,v90=b.slice(-90).reduce((s,x)=>s+x.vol,0)/90;
 const nearFib=fibs.find(x=>Math.abs(x.p-last)/last<0.025);
 const dom=ext.g?ext.g.data.market_cap_percentage.btc:null,fng=ext.f?+ext.f.data[0].value:null,fund=ext.fund?ext.fund[sym]:null;
 const S=[['Trend: price > 200MA',m200.at(-1)&&last>m200.at(-1)],['Trend: 50MA > 200MA',m50.at(-1)>m200.at(-1)],['RSI 40–65 (room to run, not overbought)',r>=40&&r<=65],
  ['Volume 20d ≥ 90d avg',v20>=v90],['Near a fib level (±2.5%)',!!nearFib],['Near support (within 5%)',sup&&(last-sup.p)/last<0.05],
  ['Sentiment: Fear&Greed ≤ 45 (contrarian)',fng!=null&&fng<=45],['Funding ≤ 0.01% (not crowded long)',fund!=null&&fund<=0.0001]];
 const n=S.filter(x=>x[1]).length,g=n>=6?'S':n>=4?'A':n>=3?'B':'C';
 $('grade').textContent=g;$('grade').className='grade '+g;$('gradeWhy').textContent=n+' of '+S.length+' signals stack';
 $('sigs').innerHTML='<tr><th>Signal</th><th>Status</th></tr>'+S.map(x=>`<tr><td>${x[0]}</td><td class="${x[1]?'ok':'warn'}">${x[1]?'YES':'no'}</td></tr>`).join('');
 const cards=[['Price',fmt(last)],['50 MA',fmt(m50.at(-1))],['200 MA',fmt(m200.at(-1))],['RSI 14',r.toFixed(1)],['Support',fmt(sup&&sup.p)],['Resistance',fmt(res&&res.p)],
  ['BTC dominance',dom?dom.toFixed(1)+'%':'n/a'],['Fear & Greed',fng!=null?fng+' '+ext.f.data[0].value_classification:'n/a'],['Funding (8h)',fund!=null?(fund*100).toFixed(4)+'%':'n/a'],['Data source',D.src]];
 $('cards').innerHTML=cards.map(x=>`<div class="card"><div class="k">${x[0]}</div><b>${x[1]}</b></div>`).join('');
 const ch=mk('cData'),ps=line(ch,b.map(x=>({time:x.time,value:x.close})),'#e6e6e6');
 line(ch,b.map((x,i)=>({time:x.time,value:m50[i]})).filter(x=>x.value),'#4c9fff');line(ch,b.map((x,i)=>({time:x.time,value:m200[i]})).filter(x=>x.value),'#ff7b39');
 fibs.forEach(x=>hline(ps,x.p,'#f0b90b','fib '+x.f));if(sup)hline(ps,sup.p,'#3c3','S',0);if(res)hline(ps,res.p,'#f44','R',0);
 const vs=ch.addHistogramSeries({priceScaleId:'v',color:'#2a3a55'});ch.priceScale('v').applyOptions({scaleMargins:{top:.8,bottom:0}});vs.setData(b.map(x=>({time:x.time,value:x.vol})));ch.timeScale().fitContent();
 if(!$('entry').value){$('entry').value=Math.round(last);$('stop').value=Math.round(sup?sup.p*0.98:last*0.93);$('tgt').value=Math.round(res?res.p:last*1.15)}
 runSim();calc();drawPanes(sym,b);st('loaded '+sym+' from '+D.src+(failed.size?' · failed: '+[...failed].join('; '):''));window.HUB_READY=true}

function runSim(){if(!D)return;const b=D.bars,last=b.at(-1).close,t0=b.at(-1).time,hz=+$('hz').value||90,mu=$('drift').value/100,sg=$('vol').value/100;
 $('driftV').textContent=$('drift').value+'%';$('volV').textContent=$('vol').value+'%';
 const ch=mk('cSim');line(ch,b.slice(-180).map(x=>({time:x.time,value:x.close})),'#e6e6e6');
 const path=a=>{const o=[{time:t0,value:last}];for(let d=1;d<=hz;d++)o.push({time:t0+d*86400,value:last*Math.exp(a*d/365)});return o};
 const sc=[['Bull +80%/yr',0.8,'#3c3'],['Base +10%/yr',0.1,'#6af'],['Bear −50%/yr',-0.5,'#f44'],['Custom',mu,'#f0b90b']];
 sc.forEach(s=>line(ch,path(Math.log(1+s[1])),s[2],2,s[0]==='Custom'?0:2));
 const N=1000,ends=[],P=Array.from({length:hz+1},()=>[]);for(let k=0;k<N;k++){let x=last;P[0].push(x);for(let d=1;d<=hz;d++){const z=Math.sqrt(-2*Math.log(Math.random()||1e-9))*Math.cos(2*Math.PI*Math.random());
  x*=Math.exp((mu-sg*sg/2)/365+sg*Math.sqrt(1/365)*z);P[d].push(x)}ends.push(x)}
 const pct=q=>P.map((a,d)=>{a.sort((x,y)=>x-y);return{time:t0+d*86400,value:a[Math.floor(q*(a.length-1))]}});
 const p10=pct(.1),p50=pct(.5),p90=pct(.9);line(ch,p90,'rgba(240,185,11,.5)',1);line(ch,p50,'rgba(240,185,11,.9)',1,1);line(ch,p10,'rgba(240,185,11,.5)',1);ch.timeScale().fitContent();
 $('simT').innerHTML=`<tr><th>Outcome in ${hz}d</th><th>Price</th><th>vs now</th></tr>`+[['MC P10',p10.at(-1).value],['MC P50',p50.at(-1).value],['MC P90',p90.at(-1).value]].concat(sc.map(s=>[s[0],path(Math.log(1+s[1])).at(-1).value]))
  .map(r=>`<tr><td>${r[0]}</td><td>${fmt(r[1])}</td><td>${((r[1]/last-1)*100).toFixed(1)}%</td></tr>`).join('');window.SIM_DRAWN=true}

function calc(){const A=+$('acct').value,rp=+$('riskp').value/100,e=+$('entry').value,s=+$('stop').value,t=+$('tgt').value;if(!e||!s||!t)return;
 const risk=Math.abs(e-s),rew=Math.abs(t-e),R=rew/risk,size=A*rp/risk;const ok=R>=3;
 $('calcOut').innerHTML=`Risk/unit ${fmt(risk)} · Reward/unit ${fmt(rew)} · <b class="${ok?'ok':'warn'}" style="display:inline;font-size:18px">${R.toFixed(2)}R</b> ${ok?'meets the 3R rule':'⚠ UNDER 3R. By Michael\'s rule: skip this trade.'}<br>Size at ${(rp*100)}% risk: ${size.toFixed(4)} units (${fmt(size*e)} notional). Max loss ${fmt(A*rp)}. Projected gain ${fmt(size*rew)}.`}

async function drawPanes(sym,b){try{const h=await hourly(sym),ch=mk('cDay'),cs=ch.addCandlestickSeries();cs.setData(h);
 const hc=h.map(x=>x.close),pv=pivots(hc,3);cluster(pv.hi.concat(pv.lo),0.004).slice(0,10).forEach(x=>hline(cs,x.p,'#888','',1));
 const r48=h.slice(-48),H=Math.max(...r48.map(x=>x.high)),L=Math.min(...r48.map(x=>x.low));[0,.236,.382,.5,.618,.786,1].forEach(f=>hline(cs,H-(H-L)*f,'#f0b90b','fib '+f,3));
 for(let k=0;k<4;k++){const a=h[h.length-1-60-k*30],z=h[h.length-1-k*20];if(a&&z)line(ch,[{time:a.time,value:a.low},{time:z.time,value:z.low}],'#4c9fff',1)}
 line(ch,h.map((x,i)=>({time:x.time,value:hc.slice(Math.max(0,i-23),i+1).reduce((s,y)=>s+y,0)/Math.min(24,i+1)})),'#c6f',1);ch.timeScale().fitContent()}catch(e){failed.add('hourly ('+e.message+')')}
 const w=b.filter((x,i)=>i%7===6||i===b.length-1),cp=mk('cPro'),ws=line(cp,w.map(x=>({time:x.time,value:x.close})),'#e6e6e6',2);
 const pv=pivots(w.map(x=>x.close),3);cluster(pv.hi.concat(pv.lo),0.06).filter(x=>x.n>=2).slice(0,3).forEach(x=>hline(ws,x.p,'#3c3','HTF ('+x.n+'x)',0));
 const c=b.map(x=>x.close),m200=sma(c,200);line(cp,b.map((x,i)=>({time:x.time,value:m200[i]})).filter(x=>x.value),'#ff7b39',2);
 const H=Math.max(...c),L=Math.min(...c);hline(ws,H-(H-L)*0.618,'#f0b90b','cycle 0.618',2);cp.timeScale().fitContent()}

async function alts(){try{const j=await cached('alts',30,()=>getJ('https://api.coingecko.com/api/v3/simple/price?ids='+Object.values(ALTS).join(',')+'&vs_currencies=usd&include_24hr_change=true&include_market_cap=true'));
 $('altT').innerHTML='<tr><th>Alt</th><th>Price</th><th>24h</th><th>Mkt cap</th><th>Rule</th></tr>'+Object.entries(ALTS).map(([s,id])=>{const x=j[id]||{};return`<tr><td>${s}</td><td>${fmt(x.usd)}</td><td>${(x.usd_24h_change||0).toFixed(2)}%</td><td>$${((x.usd_market_cap||0)/1e9).toFixed(1)}B</td><td>Only with profits once BTC/ETH base grows</td></tr>`}).join('')}
 catch(e){failed.add('CoinGecko alt prices ('+e.message+')');$('altT').innerHTML='<tr><td>Alt prices unavailable ('+e.message+')</td></tr>'}}
function rot(){const a=+$('rot').value,h=+$('hops').value,f=+$('fee').value/100,left=a*Math.pow(1-f,h*2);
 $('rotOut').innerHTML=`${h} rotations = ${h*2} trades (sell + buy each). You keep ${fmt(left)} of ${fmt(a)}, so <span class="warn">${fmt(a-left)} (${((1-left/a)*100).toFixed(2)}%) goes to fees and spread</span>, before taxes on each sale. Each new coin must beat that just to break even. Musical chairs: the exchange wins every round.`}
let Y=JSON.parse(localStorage.getItem('yield')||'[]');
function yr(){localStorage.setItem('yield',JSON.stringify(Y));$('yT').innerHTML='<tr><th>Asset</th><th>Amount</th><th>APY</th><th>Where</th><th>Yearly yield (units)</th><th>Monthly</th><th></th></tr>'+Y.map((y,i)=>`<tr><td>${y.a}</td><td>${y.amt}</td><td>${y.apy}%</td><td>${y.ex}</td><td>${(y.amt*y.apy/100).toFixed(6)}</td><td>${(y.amt*y.apy/1200).toFixed(6)}</td><td><button onclick="Y.splice(${i},1);yr()">x</button></td></tr>`).join('')}
$('yAdd').onclick=()=>{Y.push({a:$('yA').value,amt:+$('yAmt').value,apy:+$('yApy').value,ex:$('yEx').value});yr()};
document.querySelectorAll('nav button').forEach(bt=>bt.onclick=()=>{document.querySelectorAll('nav button,.pane').forEach(x=>x.classList.remove('on'));bt.classList.add('on');$(bt.dataset.p).classList.add('on');Object.values(charts).forEach(c=>c.applyOptions({width:c.chartElement().parentElement.clientWidth}))});
['drift','vol','hz'].forEach(i=>$(i).oninput=runSim);$('runSim').onclick=runSim;$('calc').onclick=calc;['rot','hops','fee'].forEach(i=>$(i).oninput=rot);
$('asset').onchange=()=>{$('entry').value='';render()};
if(location.hash)setTimeout(()=>document.querySelector(`nav button[data-p="${location.hash.slice(1)}"]`)?.click(),0);
(async()=>{yr();rot();await loadExt();await render();alts()})();
