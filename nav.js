(function(){if(window.__muNav)return;window.__muNav=1;
var H='https://code4crittersoncallapps.github.io/market-universe/',B='https://code4crittersoncallapps.github.io/';
var M={'market-universe/machine.html':['Liquidity & central banks','',[]],
'market-universe/hub/':['Universe','Map',['market-universe/machine.html']],
'picks-playbook/':['Crypto','My coins & trades',['picks-playbook/roster.html','picks-playbook/ranges.html','picks-playbook/coiled.html','picks-playbook/briefing.html']],
'picks-playbook/index.html':['Crypto','My coins & trades',['picks-playbook/roster.html','picks-playbook/ranges.html','picks-playbook/coiled.html','picks-playbook/briefing.html']],
'picks-playbook/roster.html':['Crypto','My coins & trades',['picks-playbook/','picks-playbook/ranges.html','picks-playbook/coiled.html']],
'picks-playbook/ranges.html':['Crypto','My coins & trades',['picks-playbook/','picks-playbook/roster.html','picks-playbook/coiled.html']],
'picks-playbook/coiled.html':['Crypto','My coins & trades',['picks-playbook/','picks-playbook/roster.html','picks-playbook/ranges.html']],
'picks-playbook/briefing.html':['Crypto','',['picks-playbook/','chart-caller/','correlation-lab/regimes.html']],
'picks-playbook/glossary.html':['Crypto','Cycles & learning',['setup-cards/','setup-cards/cycles.html']],
'setup-cards/':['Crypto','Cycles & learning',['setup-cards/cycles.html','setup-cards/clocks.html','setup-cards/crashes.html','picks-playbook/glossary.html']],
'setup-cards/index.html':['Crypto','Cycles & learning',['setup-cards/cycles.html','setup-cards/clocks.html','setup-cards/crashes.html']],
'setup-cards/cycles.html':['Crypto','Cycles & learning',['setup-cards/','setup-cards/clocks.html','setup-cards/crashes.html']],
'setup-cards/clocks.html':['Crypto','Cycles & learning',['setup-cards/','setup-cards/cycles.html','setup-cards/crashes.html']],
'setup-cards/crashes.html':['Geopolitics & fear','',['setup-cards/cycles.html','correlation-lab/regimes.html']],
'chart-caller/':['Crypto','',['picks-playbook/','picks-playbook/ranges.html']],
'chart-caller/index.html':['Crypto','',['picks-playbook/','picks-playbook/ranges.html']],
'correlation-lab/':['Geopolitics & fear','',['correlation-lab/regimes.html','correlation-lab/leaders.html']],
'correlation-lab/index.html':['Geopolitics & fear','',['correlation-lab/regimes.html','correlation-lab/leaders.html']],
'correlation-lab/regimes.html':['Geopolitics & fear','',['correlation-lab/','correlation-lab/leaders.html']],
'correlation-lab/leaders.html':['Stocks','',['correlation-lab/','correlation-lab/regimes.html']],
'investor-tier-map/':['Private markets','',['investor-tier-map/lightning.html']],
'investor-tier-map/index.html':['Private markets','',['investor-tier-map/lightning.html']],
'investor-tier-map/lightning.html':['Private markets','',['investor-tier-map/']]};
var N={'picks-playbook/':'Playbook','picks-playbook/roster.html':'Roster','picks-playbook/ranges.html':'Ranges','picks-playbook/coiled.html':'Coiled','picks-playbook/briefing.html':'Briefing','picks-playbook/glossary.html':'Glossary','setup-cards/':'Setup cards','setup-cards/cycles.html':'Cycles','setup-cards/clocks.html':'Clocks','setup-cards/crashes.html':'Crashes','chart-caller/':'Chart Caller','correlation-lab/':'Correlation Lab','correlation-lab/regimes.html':'Regimes','correlation-lab/leaders.html':'Leaders','investor-tier-map/':'Tier map','investor-tier-map/lightning.html':'Lightning','market-universe/machine.html':'Money Machine'};
var p=location.pathname.replace(/^\//,'');var m=M[p]||M[p.replace(/[^/]*$/,'')];if(!m&&p.indexOf('market-universe/hub')===0)m=M['market-universe/hub/'];
var e=function(s){return encodeURIComponent(s)};var bar=document.createElement('div');bar.id='mu-nav';
bar.style.cssText='position:sticky;top:0;z-index:99999;background:#0b0f17;border-bottom:1px solid #f0b90b;color:#e8ecf3;font:13px system-ui;padding:6px 10px;display:flex;flex-wrap:wrap;gap:8px;align-items:center';
var a=function(h,t,c){return '<a href="'+h+'" style="color:'+(c||'#f0b90b')+';text-decoration:none">'+t+'</a>'};
var s=a(H+'#/','🌌 Universe')+' '+a(H+'machine.html','🚂 Trains','#7fd1ff');
if(m){if(m[0]!=='Universe')s+=' › '+a(H+'#/'+e(m[0]),m[0]);if(m[1])s+=' › '+a(H+'#/'+e(m[0])+'/'+e(m[1]),m[1]);s+=' › <b>'+(N[p]||N[p.replace(/index\.html$/,'')]||document.title.slice(0,30))+'</b><span style="opacity:.5">|</span>'+m[2].map(function(x){return a(B+x,N[x]||x,'#9fb0cc')}).join(' · ')}
bar.innerHTML=s;var go=function(){document.body.insertBefore(bar,document.body.firstChild)};document.body?go():document.addEventListener('DOMContentLoaded',go)})();
